import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image src="/checked.png" alt="CVMaker Logo" width={32} height={32} className="object-contain" />
            <span className="text-xl font-bold tracking-tight font-fantasy">CVMaker</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="/ats-system" className="transition-colors hover:text-primary">ATS System</Link>
            <Link href="/resume-builder" className="transition-colors hover:text-primary">Resume Builder</Link>
            <Link href="/cover-letter-generator" className="transition-colors hover:text-primary">Cover Letter Generator</Link>
            <Link href="/merge-pdf" className="transition-colors hover:text-primary">Merge PDF</Link>
          </nav>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:underline hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms-of-use" className="hover:underline hover:text-foreground transition-colors">Terms of Use</Link>
            <span>&bull;</span>
            <p>&copy; {currentYear} CVMaker.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
