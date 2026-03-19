import { FileText, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            ATS-Friendly Resume & Cover Letter Generator
          </div>
          
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Professional Resume Builder 
            <span className="relative mx-2 inline-block text-primary">
              for Experts
              <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.5C50 2.5 150 2.5 198 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
              </svg>
            </span>
          </h1>
          
          <p className="mb-10 text-pretty text-lg text-muted-foreground sm:text-xl">
            Build ATS-optimized resumes in minutes with our Modern CV Creator. Designed exclusively for developers and professionals, achieve an ATS Score of 95+ and land your dream job instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <span>10+ Premium Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span>PDF Merge Tool</span>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Resume and Cover Letter Tools</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="w-full sm:w-44 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/resume-builder" aria-label="Start building your resume">Resume Builder</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-44" asChild>
                <Link href="/cover-letter-generator" aria-label="Start generating your cover letter">Cover Letter Generator</Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-44" asChild>
                <Link href="/merge-pdf" aria-label="Merge your resume and cover letter PDF">Merge PDF</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
