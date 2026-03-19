import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 md:py-24 prose dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing and using CVMaker, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">2. Use of Service</h2>
          <p>
            CVMaker provides tools to generate cover letters, resumes, and merge PDF files. These services are provided for your personal, non-commercial use. You agree not to misuse the services or help anyone else do so.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
          <p>
            You are entirely responsible for the content you enter into our tools. Since we do not save or verify the contents of the resumes or letters generated, it is your responsibility to ensure the accuracy, legality, and appropriateness of your documents.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">4. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without any warranty of any kind. We do not guarantee that the service will be uninterrupted, totally secure, or error-free.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable European law, CVMaker shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will indicate that changes have been made by updating the "Last Updated" date at the top of this page. Your continued use of the service constitutes acceptance of those changes.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
