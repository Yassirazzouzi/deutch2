import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'deutch2',
  description: 'Created by yasssir azzouzi',
  generator: 'yassirazzozui',
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
