'use client'

import React, { useState } from 'react'
import { ResumePreview } from './resume-preview'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { Button } from '@/components/ui/button'
import { Settings, User, FileText, Briefcase, Award, GraduationCap, Link } from 'lucide-react'

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

  const ActiveComponent = steps.find(s => s.id === activeStep)?.component || SettingsForm

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar - Forms */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-2 flex overflow-x-auto gap-2 scrollbar-none">
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

          <div className="bg-background rounded-xl border border-border/50 shadow-sm p-6 overflow-y-auto max-h-[calc(100vh-16rem)]">
            <ActiveComponent />
          </div>

          <Button 
            className="w-full shadow-lg" 
            size="lg" 
            onClick={() => window.print()}
          >
            Download PDF
          </Button>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="lg:col-span-7 hidden lg:block">
          <ResumePreview />
        </div>

      </div>
    </div>
  )
}
