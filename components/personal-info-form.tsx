'use client'

import React from "react"
import { useCoverLetterStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Globe } from 'lucide-react'

export function PersonalInfoForm() {
  const { personalInfo, setPersonalInfo, setCurrentStep, language, setLanguage } = useCoverLetterStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('company')
  }

  const isValid =
    personalInfo.firstName.trim() &&
    personalInfo.lastName.trim() &&
    personalInfo.email.trim() &&
    personalInfo.linkedin.trim() &&
    personalInfo.location.trim() &&
    personalInfo.phone.trim()

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-muted" />
          <div className="h-2 w-8 rounded-full bg-muted" />
        </div>

        {/* Language Selector */}
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>Cover Letter Language:</span>
          <Tabs value={language} onValueChange={(v) => setLanguage(v as 'en' | 'de')} className="w-[140px]">
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="en" className="text-xs">ENG</TabsTrigger>
              <TabsTrigger value="de" className="text-xs">DEU</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-border/50 shadow-md">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Tell us about yourself to customize your cover letter</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={personalInfo.firstName}
                  onChange={(e) => setPersonalInfo({ firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={personalInfo.lastName}
                  onChange={(e) => setPersonalInfo({ lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">
                LinkedIn <span className="text-destructive">*</span>
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={personalInfo.linkedin}
                onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  placeholder="github.com/johndoe"
                  value={personalInfo.github}
                  onChange={(e) => setPersonalInfo({ github: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  placeholder="johndoe.com"
                  value={personalInfo.portfolio}
                  onChange={(e) => setPersonalInfo({ portfolio: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep('templates')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Templates
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
