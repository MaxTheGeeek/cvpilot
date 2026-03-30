import { MergePdfSection } from '@/components/merge-pdf-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Merge PDF Online | Combine Resume & Cover Letter Free',
  description: 'Easily merge your resume and cover letter into a scalable single PDF securely and for free. No watermarks, rapid processing.',
}

export default function MergePdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <MergePdfSection />
      </main>
      <Footer />
    </div>
  )
}
