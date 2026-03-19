import { MergePdfSection } from '@/components/merge-pdf-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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
