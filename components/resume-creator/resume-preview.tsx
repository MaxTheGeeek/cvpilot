'use client'

import { useResumeStore } from '@/lib/store/useResumeStore'
import { Template1 } from '@/components/resume-templates/template-1'
import { Template2 } from '@/components/resume-templates/template-2'

export function ResumePreview() {
  const { template } = useResumeStore()

  return (
    <div className="flex justify-center bg-muted/30 p-4 sm:p-8 rounded-xl border border-border shadow-sm overflow-auto h-full max-h-[calc(100vh-12rem)]">
      <div 
        className="relative bg-white shadow-md w-[794px] min-h-[1123px] shrink-0" 
        style={{ transformOrigin: 'top center', transform: 'scale(0.85)' }}
      >
        {template === 'template-1' ? <Template1 /> : <Template2 />}
      </div>
    </div>
  )
}
