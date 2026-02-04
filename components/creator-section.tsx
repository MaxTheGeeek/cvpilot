'use client'

import { useCoverLetterStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { FileText, Layers } from 'lucide-react'
import { TemplatesSection } from './templates-section'
import { PersonalInfoForm } from './personal-info-form'
import { CompanyInfoForm } from './company-info-form'
import { ReviewForm } from './review-form'
import { GeneratingLoader } from './generating-loader'
import { DownloadSection } from './download-section'
import { MergePdfSection } from './merge-pdf-section'

export function CreatorSection() {
  const { activeTab, setActiveTab, currentStep } = useCoverLetterStore()

  const renderCVCreatorContent = () => {
    switch (currentStep) {
      case 'templates':
        return <TemplatesSection />
      case 'personal':
        return <PersonalInfoForm />
      case 'company':
        return <CompanyInfoForm />
      case 'review':
        return <ReviewForm />
      case 'generating':
        return <GeneratingLoader />
      case 'download':
        return <DownloadSection />
      default:
        return <TemplatesSection />
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
            <button
              onClick={() => setActiveTab('cv-creator')}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                activeTab === 'cv-creator'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <FileText className="h-4 w-4" />
              CV Creator
            </button>
            <button
              onClick={() => setActiveTab('merge-pdf')}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                activeTab === 'merge-pdf'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Layers className="h-4 w-4" />
              Merge PDF
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {activeTab === 'cv-creator' ? (
            renderCVCreatorContent()
          ) : (
            <MergePdfSection />
          )}
        </div>
      </div>
    </section>
  )
}
