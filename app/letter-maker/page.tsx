import { CreatorSection } from '@/components/creator-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function LetterMakerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <CreatorSection />
      </main>
      <Footer />
    </div>
  )
}
