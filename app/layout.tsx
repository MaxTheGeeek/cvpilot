import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CookieConsent } from '@/components/cookie-consent'
import { AnalyticsManager } from '@/components/analytics-manager'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CVMaker - Professional Cover Letter Creator',
  description: 'Create stunning cover letters with professional templates. Choose your style, fill in your details, and download your perfect cover letter in seconds.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <AnalyticsManager />
        <CookieConsent />
      </body>
    </html>
  )
}
