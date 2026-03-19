import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 md:py-24 prose dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to CVMaker. We respect your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable European laws. This Privacy Policy explains how your data is handled when you use our website.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">2. Data Processing & Storage</h2>
          <p>
            <strong>We do not store your personal resume data on our servers.</strong> All resume content, personal information, and PDF generation processes occur locally within your browser or temporarily in memory during serverless execution to generate the file. 
          </p>
          <p>
            Because we do not persist user inputs or resume documents to a database, there is no risk of your sensitive career information being exposed through our databases. Once a PDF is generated and downloaded, the temporary data is discarded.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">3. Analytics and Cookies</h2>
          <p>
            We use Google Tag Manager to collect basic, aggregated analytics to improve our service. This may involve the use of cookies to track website usage anonymously. 
          </p>
          <p>
            You have the right to accept or decline the use of non-essential cookies via our Cookie Consent banner upon your first visit. If you decline, no tracking cookies will be placed on your device.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">4. Your Rights Under GDPR</h2>
          <p>
            Under the GDPR, you have the right to access, rectify, or erase your personal data. However, because we do not store any personal data related to your resume creations, there is no personal data for us to provide, rectify, or delete. 
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">5. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy or our data practices, please contact the site administrator.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
