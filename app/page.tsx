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
        
        {/* SEO Features Section */}
        <section className="py-16 bg-muted/20" aria-label="Core Features">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Our Developer Resume Builder?</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Built exclusively for tech professionals, our platform helps you pass the strict corporate hiring filters with perfectly formatted credentials.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">ATS Score 95+ Guarantee</h3>
                <p className="text-muted-foreground">Ensure your resume perfectly parses through Applicant Tracking Systems. We rely on standard text-layers without broken tables to guarantee an ATS Score of 95+.</p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Designed for Developers</h3>
                <p className="text-muted-foreground">Highlight open-source contributions, technical skills, and complex career trajectories using our targeted, Modern CV Creator.</p>
              </div>
              <div className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Generate Instantly</h3>
                <p className="text-muted-foreground">No more messy Word documents. Build ATS-optimized resumes and generate cover letters instantly with high-fidelity PDF exporting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20" aria-label="How it works">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8">How to Build ATS-Optimized Resumes in Minutes</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-left">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">1</div>
                  <h3 className="text-lg font-semibold">Pick a Layout</h3>
                </div>
                <p className="text-muted-foreground pl-14">Choose from dozens of highly professional resume templates designed for experts.</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">2</div>
                  <h3 className="text-lg font-semibold">Input Your Data</h3>
                </div>
                <p className="text-muted-foreground pl-14">Fill in your technical experience and soft skills using our guided Multi-Step form logic.</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">3</div>
                  <h3 className="text-lg font-semibold">Download Perfect PDFs</h3>
                </div>
                <p className="text-muted-foreground pl-14">Merge your Resume and Cover Letter with our integrated tools and download instantly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

