'use client'

import { templates } from '@/lib/templates'
import { TemplateCard } from './template-card'
import { useCoverLetterStore } from '@/lib/store'

export function TemplatesSection() {
  const { selectedTemplate, setSelectedTemplate, setCurrentStep } = useCoverLetterStore()

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    setCurrentStep('personal')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Choose Your Template
        </h2>
        <p className="text-muted-foreground">
          Select a design that matches your professional style
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
    </div>
  )
}
