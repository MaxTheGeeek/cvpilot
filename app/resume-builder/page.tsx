import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ResumeBuilder } from '@/components/resume-creator/resume-builder'

export const metadata = {
  title: 'Free AI Resume Builder | Professional ATS Templates',
  description: 'Create a professional, ATS-friendly resume instantly. Use our free AI to write bullet points, format structures, and download high-quality PDFs.',
}

export default function ResumeCreatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/30">
        <ResumeBuilder />
      </main>
      <Footer />
    </div>
  )
}
