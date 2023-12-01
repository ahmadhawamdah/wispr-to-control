import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Home from '@/components/Home'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wispr to Control',
  description: 'Control the box simply with your voice',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
      <div className="h-screen bg-gradient-to-tr from-rose-100 to-teal-100">
          <Home />
      </div>
        {children}</body>
    </html>
  )
}
