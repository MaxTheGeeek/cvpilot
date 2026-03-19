'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, User, Building, Briefcase, FileText, Download } from 'lucide-react'
import { SettingsForm } from './forms/settings-form'
import { PersonalInfoForm } from './forms/personal-info-form'
import { CompanyInfoForm } from './forms/company-info-form'
import { PositionForm } from './forms/position-form'
import { ContentForm } from './forms/content-form'
import { LetterPreview } from './letter-preview'

export function LetterBuilder() {
  const { currentStep, setCurrentStep } = useCoverLetterStore()

  const steps = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'personal', icon: User, label: 'Personal' },
    { id: 'company', icon: Building, label: 'Company' },
    { id: 'position', icon: Briefcase, label: 'Position' },
    { id: 'content', icon: FileText, label: 'Content' },
  ] as const

  const renderForm = () => {
    switch (currentStep) {
      case 'settings':
        return <SettingsForm />
      case 'personal':
        return <PersonalInfoForm />
      case 'company':
        return <CompanyInfoForm />
      case 'position':
        return <PositionForm />
      case 'content':
        return <ContentForm />
      default:
        return <SettingsForm />
    }
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 lg:h-[calc(100vh-4rem-2rem)] lg:flex-row lg:overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Left Sidebar - Form */}
      <Card className="print:hidden flex h-full w-full flex-col lg:w-[500px] lg:flex-shrink-0 border bg-card text-card-foreground shadow-sm">
        {/* Progress Navigation */}
        <div className="flex border-b overflow-x-auto scrollbar-hide shrink-0">
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex min-w-20 flex-1 flex-col items-center gap-1 border-b-2 px-2 py-4 text-xs font-medium transition-colors ${
                  isActive 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            )
          })}
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderForm()}
        </div>
      </Card>

      {/* Right Panel - Live Preview */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border bg-muted/20">
        {/* Preview Toolbar */}
        <div className="print:hidden flex items-center justify-between border-b bg-background/50 px-4 py-3 backdrop-blur-sm shrink-0">
          <p className="text-sm font-medium text-muted-foreground">Live Preview</p>
          <Button size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        {/* Scrollable Preview Canvas */}
        <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 sm:p-8">
          <div className="w-full max-w-[21cm]">
             <LetterPreview />
          </div>
        </div>
      </div>
    </div>
  )
}
