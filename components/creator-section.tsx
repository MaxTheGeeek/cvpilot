'use client'

import { useCoverLetterStore } from '@/lib/store'
import { TemplatesSection } from './templates-section'
import { PersonalInfoForm } from './personal-info-form'
import { CompanyInfoForm } from './company-info-form'
import { ReviewForm } from './review-form'
import { GeneratingLoader } from './generating-loader'
import { DownloadSection } from './download-section'

export function CreatorSection() {
  const { currentStep } = useCoverLetterStore()

  const renderContent = () => {
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
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Letter Maker</h2>
        <div className="min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}
