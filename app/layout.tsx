import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { CookieConsent } from '@/components/cookie-consent'
import { AnalyticsManager } from '@/components/analytics-manager'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#2563eb', // Primary blue
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'CVMaker | Free Professional Cover Letter & Resume Builder',
  description: 'Create perfect cover letters and resumes in minutes. Free PDF generator with professional templates. AI-powered writing assistance, multi-language support (English/German).',
  applicationName: 'CVMaker',
  authors: [{ name: 'CVMaker Team' }],
  keywords: [
    'cover letter generator',
    'cv maker',
    'resume builder',
    'pdf resume',
    'job application tool',
    'cover letter templates',
    'free cv creator',
    'bewerbungsschreiben erstellen'
  ],
  metadataBase: new URL('https://cvmaker.demo.com'), // Ideally this should be the real domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cvmaker.demo.com',
    siteName: 'CVMaker',
    title: 'Professional Cover Letter Generator | CVMaker',
    description: 'Build career-winning cover letters and CVs in seconds. Choose from professional templates and download as PDF for free.',
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists eventually
        width: 1200,
        height: 630,
        alt: 'CVMaker - Professional Cover Letter Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Professional Cover Letter in Minutes - CVMaker',
    description: 'Stop struggling with assignments. Generate a perfect, customized cover letter instantly.',
    creator: '@cvmaker_app',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CVMaker',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A free online tool to generate professional cover letters and CVs with customizable templates.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <AnalyticsManager />
        <CookieConsent />
      </body>
    </html>
  )
}
