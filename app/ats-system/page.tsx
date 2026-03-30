import { AtsAnalyzer } from '@/components/ats-system/ats-analyzer'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker | AI Analyzer & Scorer',
  description: 'Upload your PDF resume to our free ATS Analyzer. Get instant AI-driven scores, keyword feedback, and optimize your CV to beat applicant tracking systems.',
}

export default function AtsSystemPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl py-12 px-4">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-primary">ATS AI Analyzer</h1>
            <p className="text-lg text-muted-foreground">Upload your resume and get an instant ATS score and feedback tailored to your profile.</p>
          </div>
          <AtsAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  )
}
