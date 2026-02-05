'use client'

import React from "react"
import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function CompanyInfoForm() {
  const { companyInfo, setCompanyInfo, setCurrentStep, personalInfo, setCoverLetterContent, coverLetterContent } = useCoverLetterStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Update cover letter content with actual values, keeping the logic dynamic
    // We replace specific placeholders if they exist, but if the user has already edited the text 
    // (and removed placeholders), we try not to be too invasive.
    // However, since we reset content on language switch, we can generally assume placeholders are present 
    // or the user is happy with the current state.

    let updatedContent = coverLetterContent

    // Simple replacement strategy
    updatedContent = updatedContent.replace(/\[Position\]/g, companyInfo.position || 'the advertised position')
    updatedContent = updatedContent.replace(/\[Company Name\]/g, companyInfo.companyName || 'your company')
    updatedContent = updatedContent.replace(/\[Your Name\]/g, `${personalInfo.firstName} ${personalInfo.lastName}`)

    setCoverLetterContent(updatedContent)
    setCurrentStep('review')
  }

  const isValid =
    companyInfo.companyName.trim() &&
    companyInfo.position.trim()

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-muted" />
        </div>
      </div>

      <Card className="border-border/50 shadow-md">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Details about the job you are applying for</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="Acme Corporation"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo({ companyName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyLocation">Company Location</Label>
              <Input
                id="companyLocation"
                placeholder="San Francisco, CA"
                value={companyInfo.companyLocation}
                onChange={(e) => setCompanyInfo({ companyLocation: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">
                Position <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                placeholder="Software Engineer"
                value={companyInfo.position}
                onChange={(e) => setCompanyInfo({ position: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                placeholder="Jane Smith, HR Manager"
                value={companyInfo.contactPerson}
                onChange={(e) => setCompanyInfo({ contactPerson: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep('personal')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
