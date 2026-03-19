import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ResumeBuilder } from '@/components/resume-creator/resume-builder'

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
