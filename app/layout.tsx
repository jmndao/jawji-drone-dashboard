import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jawji Control Panel',
  description: 'Created by Abdoullah Ndao',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
