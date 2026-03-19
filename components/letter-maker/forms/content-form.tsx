'use client'

import { useEffect } from 'react'
import { useCoverLetterStore, defaultLetterContentEn, defaultLetterContentDe } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export function ContentForm() {
  const { 
    language,
    personalInfo,
    companyInfo, 
    coverLetterContent, 
    setCoverLetterContent, 
    setCurrentStep 
  } = useCoverLetterStore()

  // Generate generic text function
  const generateText = () => {
    let greeting = ''
    let body = ''
    
    if (language === 'en') {
      greeting = companyInfo.contactPerson 
        ? `Dear ${companyInfo.contactPerson},` 
        : `Dear Sir or Madam,`
        
      body = `I am writing to express my strong interest in the ${companyInfo.position || 'open position'} at ${companyInfo.companyName || 'your company'}. With my background and experience, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed strong skills relevant to this role. I am particularly drawn to ${companyInfo.companyName || 'your company'} because of its strong reputation and innovative approach.

I am excited about the opportunity to contribute to your team and would welcome the chance to discuss how my experience aligns with your needs.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
${personalInfo.firstName} ${personalInfo.lastName}`.trim()
    } else {
      greeting = companyInfo.contactPerson 
        ? `Sehr geehrte/r ${companyInfo.contactPerson},` 
        : `Sehr geehrte Damen und Herren,`
        
      body = `hiermit bewerbe ich mich mit großem Interesse um die Position als ${companyInfo.position || 'offene Position'} bei ${companyInfo.companyName || 'lhrem Unternehmen'}. Aufgrund meiner bisherigen Erfahrungen bin ich überzeugt, einen wertvollen Beitrag zu Ihrem Team leisten zu können.

In meiner beruflichen Laufbahn konnte ich umfassende fachliche Kenntnisse erwerben. Besonders an ${companyInfo.companyName || 'lhrem Unternehmen'} reizt mich die Innovationskraft und die Unternehmenskultur.

Ich freue mich über die Möglichkeit, meine Motivation und Qualifikationen in einem persönlichen Gespräch näher zu erläutern.

Vielen Dank für die Prüfung meiner Unterlagen.

Mit freundlichen Grüßen,
${personalInfo.firstName} ${personalInfo.lastName}`.trim()
    }

    return `${greeting}\n\n${body}`
  }

  // Auto-fill on mount if it's still default
  useEffect(() => {
    if (coverLetterContent === defaultLetterContentEn || coverLetterContent === defaultLetterContentDe || coverLetterContent === '') {
      setCoverLetterContent(generateText())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRegenerate = () => {
    setCoverLetterContent(generateText())
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Letter Content</h3>
          <p className="text-sm text-muted-foreground">
            Edit your auto-generated cover letter content below.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRegenerate} className="flex gap-2">
          <RotateCcw className="h-4 w-4" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Letter Body</Label>
        <Textarea 
          id="content"
          value={coverLetterContent}
          onChange={(e) => setCoverLetterContent(e.target.value)}
          className="min-h-[400px] resize-y font-mono text-sm leading-relaxed"
        />
        <p className="text-xs text-muted-foreground text-right">
          {coverLetterContent.length} characters
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setCurrentStep('position')}>
          Previous
        </Button>
      </div>
    </div>
  )
}
