'use client'

import React from "react"

import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from 'lucide-react'

export function ReviewForm() {
  const {
    coverLetterContent,
    setCoverLetterContent,
    setCurrentStep,
    personalInfo,
    companyInfo,
    selectedTemplate
  } = useCoverLetterStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('generating')
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
        </div>
      </div>

      <Card className="border-border/50 shadow-md">
        <CardHeader>
          <CardTitle>Review Your Cover Letter</CardTitle>
          <CardDescription>Edit and customize your cover letter content before generation</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Summary card */}
          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <span className="font-medium text-muted-foreground">Name:</span>{' '}
                <span>{personalInfo.firstName} {personalInfo.lastName}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Position:</span>{' '}
                <span>{companyInfo.position}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Company:</span>{' '}
                <span>{companyInfo.companyName}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Template:</span>{' '}
                <span className="capitalize">{selectedTemplate?.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter Content</Label>
              <textarea
                id="coverLetter"
                className="min-h-[300px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={coverLetterContent}
                onChange={(e) => setCoverLetterContent(e.target.value)}
                placeholder="Write your cover letter here..."
              />
              <p className="text-xs text-muted-foreground">
                You can make final edits to the text above.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep('company')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Generate PDF
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
