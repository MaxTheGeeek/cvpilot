'use client'

import { LetterTemplate } from '@/components/letter-templates/letter-template'

export function LetterPreview() {
  return (
    <div className="w-full bg-white shadow-lg overflow-hidden page">
      <LetterTemplate />
    </div>
  )
}
