'use client'
import { UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export default function ToolPage() {
  const [cleanedRows, setCleanedRows] = useState([])
  const [fileName, setFileName] = useState('')
  const [uploaded, setUploaded] = useState(false)
  const [subscribed, setSubscribed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [canceling, setCanceling] = useState(false)
  const [canceled, setCanceled] = useState(false)
  const [periodEnd, setPeriodEnd] = useState(null)

  useEffect(() => {
    checkSubscription()
  }, [])

  async function checkSubscription() {
    try {
      const res = await fetch('/api/subscription')
      const data = await res.json()
      setSubscribed(data.active)
      setCanceled(data.cancelAtPeriodEnd)
      setPeriodEnd(data.periodEnd)
    } catch {
      setSubscribed(false)
    } finally {
      setLoading(false)
    }
  }

async function handleSubscribe(priceId) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId })
  })
  const data = await res.json()
  if (data.url) window.location.href = data.url
}

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription? You will keep access until the end of your billing period.')) return
    setCanceling(true)
    const res = await fetch('/api/cancel', { method: 'POST' })
    const data = await res.json()
    if (data.success) {
      setCanceling(false)
      setCanceled(true)
    } else {
      setCanceling(false)
      alert('Something went wrong. Please try again.')
    }
  }

  async function handleReactivate() {
    if (!confirm(`Reactivate your subscription? You will be billed again on ${periodEnd}.`)) return
    const res = await fetch('/api/reactivate', { method: 'POST' })
    const data = await res.json()
    if (data.success) {
      setCanceled(false)
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  function parsePnl(raw) {
    if (!raw) return 0
    const s = raw.trim()
    if (s.startsWith('$(')) return -parseFloat(s.replace('$(', '').replace(')', '').replace('$', '').replace(',', ''))
    return parseFloat(s.replace('$', '').replace(',', ''))
  }

  function parseDate(raw) {
    if (!raw) return ''
    const parts = raw.trim().split(' ')
    const [m, d, y] = parts[0].split('/')
    if (!m || !d || !y) return raw
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => processCSV(e.target.result)
    reader.readAsText(file)
  }

  function processCSV(text) {
    const lines = text.trim().split(/\r?\n/)
    if (lines.length < 2) return
    const rows = []

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',')
      if (cols.length < 13) continue
      const symbol = cols[0]
      const qty = cols[6]
      const buyPrice = parseFloat(cols[7])
      const sellPrice = parseFloat(cols[8])
      const pnl = parsePnl(cols[9])
      const date = parseDate(cols[10])
      const duration = cols[12]
      rows.push({ date, symbol, qty, buyPrice: buyPrice.toFixed(2), sellPrice: sellPrice.toFixed(2), pnl, duration })
    }

    setCleanedRows(rows)
    setUploaded(true)
  }

  function downloadCSV() {
    const headers = ['Date', 'Symbol', 'Qty', 'Entry Price', 'Exit Price', 'P&L', 'Duration', 'Result']
    const rows = cleanedRows.map(r => [
      r.date, r.symbol, r.qty, r.buyPrice, r.sellPrice,
      r.pnl.toFixed(2), r.duration, r.pnl >= 0 ? 'Win' : 'Loss'
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'notion_ready_trades.csv'
    a.click()
  }

  if (loading) {
    return (
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '500' }}>Trade Journal Cleaner</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        <p style={{ color: '#888', fontSize: '14px' }}>Checking subscription...</p>
      </main>
    )
  }

if (!subscribed) {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '500' }}>Trade Journal Cleaner</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', background: '#fafaf8' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' }}>Subscribe to get access</h2>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '2rem', lineHeight: '1.6' }}>
          Clean and import your Tradovate trades into Notion instantly.<br />
          Cancel anytime.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
          <div style={{ border: '1.5px solid #eee', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', background: '#fff' }}>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly</p>
            <p style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '4px' }}>$4.99</p>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '1.25rem' }}>per month</p>
            <button
              onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY)}
              style={{ width: '100%', background: '#0e0e0e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              Get started
            </button>
          </div>

          <div style={{ border: '1.5px solid #0e0e0e', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', background: '#fff', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0e0e0e', color: '#fff', fontSize: '11px', padding: '3px 12px', borderRadius: '99px', whiteSpace: 'nowrap' }}>
              Best value
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Yearly</p>
            <p style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '4px' }}>$39</p>
            <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '1.25rem' }}>per year · save 35%</p>
            <button
              onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY)}
              style={{ width: '100%', background: '#0e0e0e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              Get started
            </button>
          </div>
        </div>

        <p style={{ color: '#bbb', fontSize: '12px' }}>🔒 Your data never leaves your device</p>
      </div>
    </main>
  )
}

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '500' }}>Trade Journal Cleaner</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <button
              onClick={canceled ? handleReactivate : handleCancel}
              disabled={canceling}
              style={{ fontSize: '12px', color: canceled ? '#1a8a5a' : '#bbb', background: 'none', border: 'none', cursor: canceling ? 'default' : 'pointer', textDecoration: 'underline' }}>
              {canceling ? 'Updating...' : canceled ? 'Reactivate subscription' : 'Cancel subscription'}
            </button>
            {periodEnd && (
              <p style={{ fontSize: '11px', color: '#ccc', margin: 0 }}>
                {canceled ? `Access until ${periodEnd}` : `Renews ${periodEnd}`}
              </p>
            )}
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {!uploaded ? (
        <label
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#1a8a5a'; e.currentTarget.style.background = '#f0faf4' }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.background = '#fafaf8' }}
          onDrop={(e) => {
            e.preventDefault()
            e.currentTarget.style.borderColor = '#ccc'
            e.currentTarget.style.background = '#fafaf8'
            const file = e.dataTransfer.files[0]
            if (!file) return
            setFileName(file.name)
            const reader = new FileReader()
            reader.onload = (ev) => processCSV(ev.target.result)
            reader.readAsText(file)
          }}
          style={{ display: 'block', border: '1.5px dashed #ccc', borderRadius: '12px', padding: '3rem', textAlign: 'center', cursor: 'pointer', background: '#fafaf8', transition: 'border-color 0.15s, background 0.15s' }}>
          <input type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} />
          <p style={{ fontWeight: '500', marginBottom: '4px' }}>Upload your Tradovate CSV</p>
          <p style={{ color: '#888', fontSize: '14px' }}>drag & drop or click to browse</p>
          <p style={{ color: '#bbb', fontSize: '12px', marginTop: '12px' }}>🔒 Your data never leaves your device</p>
        </label>
      ) : (
        <>
          <div style={{ background: '#f0faf4', border: '1px solid #c3e6d0', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1a8a5a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: '500', fontSize: '14px', marginBottom: '2px' }}>File cleaned successfully</p>
              <p style={{ fontSize: '13px', color: '#555' }}>{fileName} — {cleanedRows.length} trade{cleanedRows.length !== 1 ? 's' : ''} ready to import</p>
            </div>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <div style={{ padding: '10px 14px', background: '#f5f5f2', borderBottom: '1px solid #eee' }}>
              <p style={{ fontSize: '11px', color: '#888', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview — first 3 trades</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  {['Date', 'Symbol', 'P&L', 'Result'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 14px', color: '#888', fontWeight: '500', borderBottom: '1px solid #eee' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cleanedRows.slice(0, 3).map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '8px 14px', fontFamily: 'monospace' }}>{r.date}</td>
                    <td style={{ padding: '8px 14px' }}>{r.symbol}</td>
                    <td style={{ padding: '8px 14px', color: r.pnl >= 0 ? '#1a8a5a' : '#c0392b', fontWeight: '500' }}>${r.pnl.toFixed(2)}</td>
                    <td style={{ padding: '8px 14px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '99px', background: r.pnl >= 0 ? '#e8f5ee' : '#fdecea', color: r.pnl >= 0 ? '#1a8a5a' : '#c0392b', fontWeight: '500' }}>
                        {r.pnl >= 0 ? 'Win' : 'Loss'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { setUploaded(false); setCleanedRows([]); setFileName('') }} style={{ fontSize: '13px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #ddd', background: 'none', cursor: 'pointer', flex: 1 }}>
              Upload new file
            </button>
            <button onClick={downloadCSV} style={{ fontSize: '13px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0e0e0e', color: '#fff', cursor: 'pointer', flex: 2 }}>
              Download for Notion
            </button>
          </div>
        </>
      )}
    </main>
  )
}