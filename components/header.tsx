'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Resume Creator', href: '/resume-creator' },
    { name: 'Letter Maker', href: '/letter-maker' },
    { name: 'Merge PDF', href: '/merge-pdf' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/checked.png" alt="CVMaker Logo" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold tracking-tight font-fantasy">CVMaker</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
