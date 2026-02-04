'use client'

import React from "react"

import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function CompanyInfoForm() {
  const { companyInfo, setCompanyInfo, setCurrentStep, personalInfo, setCoverLetterContent, coverLetterContent } = useCoverLetterStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Update cover letter content with actual values
    let updatedContent = coverLetterContent
    updatedContent = updatedContent.replace('[Position]', companyInfo.position || 'the advertised position')
    updatedContent = updatedContent.replace('[Company Name]', companyInfo.companyName || 'your company')
    updatedContent = updatedContent.replace('[Your Name]', `${personalInfo.firstName} ${personalInfo.lastName}`)
    setCoverLetterContent(updatedContent)
    
    setCurrentStep('review')
  }

  const isValid = 
    companyInfo.companyName.trim() &&
    companyInfo.position.trim()

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Company Information</h2>
        <p className="text-muted-foreground">Tell us about the position you are applying for</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-muted" />
        </div>
      </div>

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
    </div>
  )
}
