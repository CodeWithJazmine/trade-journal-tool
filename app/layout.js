import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Trade Importer Tool',
  description: 'Clean your Tradovate CSV for Notion',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}