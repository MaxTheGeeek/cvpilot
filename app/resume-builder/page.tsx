import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ResumeBuilder } from '@/components/resume-creator/resume-builder'

export const metadata = {
  title: 'ATS-Friendly Resume Builder | Create Expert CVs instantly',
  description: 'Build an ATS optimized resume designed for developers and professionals out-of-the-box.',
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
