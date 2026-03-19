'use client'

import React from "react"

import { useRef } from 'react'
import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Plus, 
  Upload, 
  X, 
  Download, 
  Loader2,
  CheckCircle,
  Layers
} from 'lucide-react'

export function MergePdfSection() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { 
    pdfFiles, 
    addPdfFile, 
    removePdfFile, 
    mergedPdfUrl,
    setMergedPdfUrl,
    isMerging,
    setIsMerging,
    resetMergePdf
  } = useCoverLetterStore()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type === 'application/pdf' && pdfFiles.length < 3) {
          addPdfFile(file)
        }
      })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleMerge = async () => {
    if (pdfFiles.length < 2) return
    
    setIsMerging(true)
    try {
      const formData = new FormData()
      pdfFiles.forEach((file, index) => {
        formData.append(`file${index}`, file)
      })
      formData.append('fileCount', String(pdfFiles.length))

      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Failed to merge PDFs')

      const data = await response.json()
      setMergedPdfUrl(data.downloadUrl)
    } catch (error) {
      console.error('Error merging PDFs:', error)
    } finally {
      setIsMerging(false)
    }
  }

  const handleDownload = () => {
    if (mergedPdfUrl) {
      const link = document.createElement('a')
      link.href = mergedPdfUrl
      link.download = 'merged-document.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resetMergePdf()
    }
  }

  // Show loading state
  if (isMerging) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Layers className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-lg font-medium">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Merging your PDFs...
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This may take a few seconds
        </p>
      </div>
    )
  }

  // Show download state
  if (mergedPdfUrl) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          PDFs Merged Successfully!
        </h2>
        <p className="mb-8 text-muted-foreground">
          Your documents have been combined into a single PDF file.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download Merged PDF
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={resetMergePdf}
            className="flex items-center gap-2 bg-transparent"
          >
            Merge More PDFs
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Merge PDF Files
        </h2>
        <p className="text-muted-foreground">
          Combine up to 3 PDF files into one document
        </p>
      </div>

      {/* Upload area */}
      <div 
        className="relative cursor-pointer rounded-xl border-2 border-dashed border-border bg-muted/30 p-10 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
        onClick={() => pdfFiles.length < 3 && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={pdfFiles.length >= 3}
        />
        
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-medium">
              {pdfFiles.length >= 3 
                ? 'Maximum files reached' 
                : 'Click to upload PDF files'
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {pdfFiles.length}/3 files uploaded
            </p>
          </div>
        </div>
      </div>

      {/* File list */}
      {pdfFiles.length > 0 && (
        <div className="space-y-3">
          {pdfFiles.map((file, index) => (
            <div 
              key={index}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePdfFile(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Add more button */}
          {pdfFiles.length < 3 && (
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another PDF
            </Button>
          )}
        </div>
      )}

      {/* Merge button */}
      <Button
        size="lg"
        className="w-full"
        disabled={pdfFiles.length < 2}
        onClick={handleMerge}
      >
        <Layers className="mr-2 h-5 w-5" />
        Merge {pdfFiles.length} PDF{pdfFiles.length !== 1 ? 's' : ''}
      </Button>

      {pdfFiles.length < 2 && pdfFiles.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Add at least one more PDF to enable merging
        </p>
      )}
    </div>
  )
}
