'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, FileText, RefreshCw } from 'lucide-react'

export function DownloadSection() {
  const { generatedFileUrl, resetForm } = useCoverLetterStore()

  const handleDownload = () => {
    if (generatedFileUrl) {
      const link = document.createElement('a')
      link.href = generatedFileUrl
      link.download = 'cover-letter.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Reset form after download
      setTimeout(() => {
        resetForm()
      }, 500)
    }
  }

  const handleCreateAnother = () => {
    resetForm()
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Your Cover Letter is Ready!
      </h2>
      <p className="mb-8 text-muted-foreground">
        Your professionally designed cover letter has been generated successfully.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download PDF
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleCreateAnother}
          className="flex items-center gap-2 bg-transparent"
        >
          <RefreshCw className="h-4 w-4" />
          Create Another
        </Button>
      </div>

      {/* Preview card */}
      <div className="mt-10 flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">cover-letter.pdf</p>
          <p className="text-xs text-muted-foreground">Ready for download</p>
        </div>
      </div>
    </div>
  )
}
