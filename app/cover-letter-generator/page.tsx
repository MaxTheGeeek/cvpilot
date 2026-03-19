import { LetterBuilder } from '@/components/letter-maker/letter-builder'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Cover Letter Generator | Generate Professional Cover Letters',
  description: 'Instantly generate engaging, customizable cover letters perfectly matched to your resume.',
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
