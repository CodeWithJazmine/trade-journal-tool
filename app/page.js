import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: '#fafaf8' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '500', marginBottom: '0.5rem' }}>Trade Journal Cleaner</h1>
      <p style={{ color: '#888', marginBottom: '0.5rem', fontSize: '15px' }}>Clean your Tradovate CSV for Notion — instantly.</p>
      <p style={{ color: '#bbb', fontSize: '12px', marginBottom: '2rem' }}>
        Currently supports Tradovate. Using a different broker?{' '}
        <a href="mailto:business.softcreated@gmail.com" style={{ color: '#888', textDecoration: 'underline' }}>
          Send us the broker name
        </a>{' '}
        and we'll work on adding support. 🖤
      </p>
      <Link href="/tool" style={{ background: '#0e0e0e', color: '#fff', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>
        Get Started
      </Link>
      <p style={{ color: '#bbb', fontSize: '12px', marginTop: '1rem' }}>🔒 Your data never leaves your device</p>
    </main>
  )
}