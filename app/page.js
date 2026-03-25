import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', background: '#fafaf8', minHeight: '100vh' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #eee', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '600', fontSize: '15px' }}>SoftCreated</span>
        <a href="mailto:business.softcreated@gmail.com" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>
          business.softcreated@gmail.com
        </a>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '5rem 2rem 3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#2D9B8A', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Digital Products for Women Who Trade
        </p>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '500', lineHeight: '1.2', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          The Trader's Diary
        </h1>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', marginBottom: '0.75rem' }}>
          A Notion trading journal built for women who want clarity, confidence, and control — without the monthly subscription.
        </p>
        <p style={{ color: '#999', fontSize: '13px', marginBottom: '2.5rem' }}>
          Currently supports Tradovate. Using a different broker?{' '}
          <a href="mailto:business.softcreated@gmail.com" style={{ color: '#666', textDecoration: 'underline' }}>
            Send us the broker name
          </a>{' '}
          and we'll work on adding support.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://softcreated.gumroad.com"
            style={{ background: '#1a1a1a', color: '#fff', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Get The Trader's Diary — $27
          </a>
          <Link
            href="/tool"
            style={{ background: '#fff', color: '#1a1a1a', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '500', border: '1px solid #ddd' }}>
            Trade Importer Tool
          </Link>
        </div>
      </section>

      {/* Products */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '14px', padding: '1.75rem' }}>
          <p style={{ fontSize: '11px', color: '#2D9B8A', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Notion Template</p>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>The Trader's Diary</h2>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            A complete trading journal system. Track trades, understand your psychology, and grow as a trader — one time purchase, no monthly fees.
          </p>
          <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>$27</p>
          <a href="https://softcreated.gumroad.com" style={{ display: 'block', textAlign: 'center', background: '#1a1a1a', color: '#fff', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            Buy on Gumroad
          </a>
        </div>

        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '14px', padding: '1.75rem' }}>
          <p style={{ fontSize: '11px', color: '#2D9B8A', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Subscription Tool</p>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>Trade Importer Tool</h2>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            Upload your Tradovate CSV and get perfectly formatted import files for Notion in seconds. Built specifically for The Trader's Diary.
          </p>
          <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>$4.99/mo</p>
          <Link href="/tool" style={{ display: 'block', textAlign: 'center', background: '#1a1a1a', color: '#fff', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Policies — required for Stripe */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem 2rem' }}>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '14px', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '1rem' }}>Refund & Dispute Policy</h3>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.7', marginBottom: '0.75rem' }}>
            All purchases from SoftCreated are for digital products and are non-refundable. Because digital products are delivered immediately upon purchase and cannot be returned, we do not offer refunds once a purchase is complete.
          </p>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.7', marginBottom: '0.75rem' }}>
            The Trade Importer Tool is a subscription product. You may cancel your subscription at any time and will retain access until the end of your current billing period. No partial refunds are issued for unused subscription time.
          </p>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.7' }}>
            If you experience a technical issue with your purchase, please contact us at{' '}
            <a href="mailto:business.softcreated@gmail.com" style={{ color: '#555' }}>business.softcreated@gmail.com</a>{' '}
            and we will do our best to resolve it.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #eee', padding: '1.5rem 2rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: '#aaa' }}>© 2026 SoftCreated. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="mailto:business.softcreated@gmail.com" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}>Contact</a>
          <a href="https://softcreated.gumroad.com" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}>Gumroad</a>
          <a href="https://www.instagram.com/softcreated" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}>Instagram</a>
        </div>
      </footer>

    </main>
  )
}