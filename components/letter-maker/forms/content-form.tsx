'use client'

import { useEffect, useState } from 'react'
import { useCoverLetterStore, defaultLetterContentEn, defaultLetterContentDe } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { puter } from '@heyputer/puter.js'

export function ContentForm() {
  const { 
    language,
    personalInfo,
    companyInfo, 
    coverLetterContent, 
    setCoverLetterContent, 
    setCurrentStep 
  } = useCoverLetterStore()

  const [isLoading, setIsLoading] = useState(false)

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

  const handleAIGenerate = async () => {
    setIsLoading(true)
    try {
      const prompt = `You are an expert cover letter writer. 
Generate a professional cover letter based on the following details.
Language: ${language === 'de' ? 'German' : 'English'}
Output ONLY the cover letter content. Do not include placeholders like [Your Name] if the information is provided.

Personal Information:
- Name: ${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}
- Current Role: ${personalInfo?.currentRole || ''}
- Skills: ${personalInfo?.skills || ''}

Company & Position Information:
- Company Name: ${companyInfo?.companyName || ''}
- Job Title: ${companyInfo?.position || ''}
- Hiring Manager/Contact: ${companyInfo?.contactPerson || 'Hiring Manager'}
- Company Aspects/Details: ${companyInfo?.companyAspects || ''}`;

      const response = await puter.ai.chat(prompt, { stream: true })
      
      let generatedText = ''
      for await (const part of response) {
        if (part?.text) {
          generatedText += part.text
          setCoverLetterContent(generatedText)
        }
      }
    } catch (error) {
      console.error("Puter AI Error:", error)
      toast.error("Failed to generate with AI. Ensure you are connected to Puter.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Letter Content</h3>
          <p className="text-sm text-muted-foreground">
            Edit your generated cover letter content below.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRegenerate} className="flex gap-2" disabled={isLoading}>
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="default" size="sm" onClick={handleAIGenerate} className="flex gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0" disabled={isLoading}>
            <Sparkles className="h-4 w-4" />
            {isLoading ? 'Generating...' : 'AI Generate'}
          </Button>
        </div>
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="content">Letter Body</Label>
        <Textarea 
          id="content"
          value={coverLetterContent}
          onChange={(e) => setCoverLetterContent(e.target.value)}
          className="min-h-[400px] resize-y font-mono text-sm leading-relaxed"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {coverLetterContent.length} characters
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setCurrentStep('position')} disabled={isLoading}>
          Previous
        </Button>
      </div>
    </div>
  )
}
