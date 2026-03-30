'use client'

import React, { useState } from 'react'
import { ResumePreview } from './resume-preview'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { Button } from '@/components/ui/button'
import { Settings, User, FileText, Briefcase, Award, GraduationCap, Link, Download, ChevronRight, ChevronLeft } from 'lucide-react'

// Placeholder Form Imports
import { SettingsForm } from './forms/settings-form'
import { PersonalInfoForm } from './forms/personal-info-form'
import { SummaryForm } from './forms/summary-form'
import { ExperienceForm } from './forms/experience-form'
import { SkillsForm } from './forms/skills-form'
import { EducationForm } from './forms/education-form'
import { AdditionalInfoForm } from './forms/additional-info-form'

type StepId = 'settings' | 'personal' | 'summary' | 'experience' | 'skills' | 'education' | 'additional'

export function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState<StepId>('settings')

  const steps = [
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsForm },
    { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
    { id: 'summary', label: 'Summary', icon: FileText, component: SummaryForm },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, component: ExperienceForm },
    { id: 'skills', label: 'Skills', icon: Award, component: SkillsForm },
    { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
    { id: 'additional', label: 'Additional Info', icon: Link, component: AdditionalInfoForm },
  ] as const

  const currentStepIndex = steps.findIndex(s => s.id === activeStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep(steps[currentStepIndex + 1].id as StepId)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setActiveStep(steps[currentStepIndex - 1].id as StepId)
    }
  }

  const ActiveComponent = (steps[currentStepIndex]?.component || SettingsForm) as React.ElementType

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar - Forms */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-12rem)]">
          {/* Step Indicator Top Bar */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-2 flex overflow-x-auto gap-2 scrollbar-none shrink-0">
            {steps.map(step => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id as StepId)}
                  className={`flex flex-col items-center justify-center min-w-[80px] p-2 rounded-lg transition-colors \${
                    isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-[10px] uppercase tracking-wider">{step.label}</span>
                </button>
              )
            })}
          </div>

          {/* Form Content Scrollable Area */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-6 overflow-y-auto flex-1">
            <ActiveComponent />
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-4 flex justify-between items-center shrink-0">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={isFirstStep}
              className="w-28"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>

            {isLastStep ? (
              <Button 
                onClick={() => window.print()}
                className="w-40 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Download className="h-4 w-4 mr-1" /> Download PDF
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="w-28"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="lg:col-span-7 hidden lg:block h-[calc(100vh-12rem)] overflow-y-auto">
          <ResumePreview />
        </div>

      </div>
    </div>
  )
}
