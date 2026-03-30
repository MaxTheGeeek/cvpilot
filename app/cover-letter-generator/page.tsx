import { LetterBuilder } from '@/components/letter-maker/letter-builder'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Free AI Cover Letter Generator | Tailor Your Application instantly',
  description: 'Instantly generate an engaging, ATS-optimized cover letter perfectly matched to your resume and the job description using our free AI generator.',
};

export default function LetterMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/10 py-6">
        <LetterBuilder />
      </main>
      <Footer />
    </div>
  )
}
