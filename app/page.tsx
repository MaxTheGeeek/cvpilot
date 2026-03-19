import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Select a Tool to Start</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" asChild>
                <Link href="/resume-creator">Resume Creator</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/letter-maker">Letter Maker</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/merge-pdf">Merge PDF</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

