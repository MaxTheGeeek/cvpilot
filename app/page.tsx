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
        {/* JSON-LD WebPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Free AI Resume Builder & Cover Letter Generator",
              "description": "Create a professional, ATS-friendly resume and cover letter instantly for free using our advanced AI builder.",
              "url": "https://cvmaker.demo.com",
            })
          }}
        />
        
        <HeroSection />
        
        {/* SEO Features Section */}
        <section className="py-16 bg-muted/20" aria-label="Core AI Resume Features">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Our Free AI Resume Builder?</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Built exclusively for modern professionals, our platform helps you pass strict corporate hiring filters using a smart, free ATS resume checker and perfectly formatted templates.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <article className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">ATS Score 95+ Guarantee</h3>
                <p className="text-muted-foreground">Ensure your resume flawlessly parses through Applicant Tracking Systems. We use clean text-layers without broken tables to guarantee high ATS compatibility and scoring.</p>
              </article>
              <article className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">AI Cover Letter Generator</h3>
                <p className="text-muted-foreground">Stop struggling with creative writing. Use our powerful Puter AI integration to instantly generate highly-tailored, professional cover letters for any job application.</p>
              </article>
              <article className="p-6 bg-background rounded-xl shadow-sm border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Free PDF Merge Online</h3>
                <p className="text-muted-foreground">No more messy documents. Build ATS-optimized resumes and combine them seamlessly with our secure merge PDF tool for instantaneous, high-fidelity downloading.</p>
              </article>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20" aria-label="How to build a resume">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8">How to Build an ATS-Optimized Resume in Minutes</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-left">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">1</div>
                  <h3 className="text-lg font-semibold">Pick an ATS Template</h3>
                </div>
                <p className="text-muted-foreground pl-14">Choose from dozens of highly professional, ATS-friendly resume templates designed to impress recruiters.</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">2</div>
                  <h3 className="text-lg font-semibold">Generate with AI</h3>
                </div>
                <p className="text-muted-foreground pl-14">Enhance your bullet points or write comprehensive summaries from scratch using our integrated AI tools.</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">3</div>
                  <h3 className="text-lg font-semibold">Export Securely</h3>
                </div>
                <p className="text-muted-foreground pl-14">Evaluate your document with the built-in ATS checker, merge your files, and download your pristine PDF instantly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

