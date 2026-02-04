'use client'

import { useEffect } from 'react'
import { useCoverLetterStore } from '@/lib/store'
import { FileText, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function GeneratingLoader() {
  const { 
    setCurrentStep, 
    setGeneratedFileUrl,
    personalInfo,
    companyInfo,
    coverLetterContent,
    selectedTemplate
  } = useCoverLetterStore()

  useEffect(() => {
    const generatePdf = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            personalInfo,
            companyInfo,
            coverLetterContent,
            templateId: selectedTemplate,
            userId: user?.id || null
          })
        })

        if (!response.ok) throw new Error('Failed to generate PDF')

        const data = await response.json()
        setGeneratedFileUrl(data.downloadUrl)
        setCurrentStep('download')
      } catch (error) {
        console.error('Error generating PDF:', error)
        setCurrentStep('review')
      }
    }

    generatePdf()
  }, [setCurrentStep, setGeneratedFileUrl, personalInfo, companyInfo, coverLetterContent, selectedTemplate])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-lg font-medium">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        Generating your cover letter...
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This may take a few seconds
      </p>
    </div>
  )
}
