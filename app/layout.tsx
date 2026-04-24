import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, MedievalSharp } from 'next/font/google'
import Script from 'next/script'
import { CookieConsent } from '@/components/cookie-consent'
import { AnalyticsManager } from '@/components/analytics-manager'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const fantasyFont = MedievalSharp({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-fantasy',
});

export const viewport: Viewport = {
  themeColor: '#5873B2', // Primary blue
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: '%s | Free AI Resume Builder & Cover Letter Generator',
    default: 'Free AI Resume Builder & Cover Letter Generator | CVMaker',
  },
  description: 'Create professional, ATS-friendly resumes and cover letters in seconds for free using AI. Instant PDF export, ATS scoring, and modern templates.',
  applicationName: 'CVMaker',
  authors: [{ name: 'CVMaker Team' }],
  keywords: [
    'free AI resume builder',
    'AI cover letter generator',
    'ATS resume checker',
    'merge PDF online',
    'free cv creator',
    'ATS friendly resume templates',
    'job application tool',
    'Puter AI resume'
  ],
  metadataBase: new URL('https://cvmaker.demo.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cvmaker.demo.com',
    siteName: 'CVMaker',
    title: 'ATS-Friendly Resume Builder & Cover Letter Generator',
    description: 'Get hired with a professional, ATS-friendly resume and cover letter built in seconds for free using AI. Get your ATS score instantly.',
    images: [
      {
        url: '/open-graph.png',
        width: 1200,
        height: 630,
        alt: 'ATS-Friendly Resume Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS-Friendly Resume Builder & Cover Letter Generator | CVMaker',
    description: 'Get hired with a professional, ATS-friendly resume and cover letter built in seconds for free using AI.',
    creator: '@cvmaker_app',
    images: ['/open-graph.png'],
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
    description: 'A free online AI toolkit to generate professional ATS-friendly resumes, cover letters, and score CVs.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2150',
    },
    featureList: [
      "AI Resume Builder",
      "AI Cover Letter Generator",
      "ATS Resume Analyzer",
      "PDF Merger"
    ]
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-586VM2ND');`
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`font-sans antialiased ${fantasyFont.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-586VM2ND"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AnalyticsManager />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
