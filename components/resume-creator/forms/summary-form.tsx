'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { puter } from '@heyputer/puter.js'

export function SummaryForm() {
  const { data, updateData } = useResumeStore()
  const [isLoading, setIsLoading] = useState(false)

  const MAX_CHARS = 1000

  const handleEnhance = async () => {
    setIsLoading(true)
    try {
      const isGeneratingFromScratch = !data.summary.trim();
      const prompt = `You are an expert ATS resume writer.
${isGeneratingFromScratch
  ? `Create a powerful, professional summary for a ${data.roleTitle || 'Professional'} with skills in ${data.skills.join(', ') || 'their field'}.`
  : `Rewrite the following resume summary to be more impactful, professional, and ATS-friendly for a ${data.roleTitle || 'Professional'}.`
}

Do not include any placeholders, conversational text, or quotes. Just output the final polished paragraph.

${isGeneratingFromScratch ? '' : `Please enhance this text:\n\n${data.summary}`}`;

      const response = await puter.ai.chat(prompt, { stream: true })
      
      let generatedText = ''
      for await (const part of response) {
        if (part?.text) {
          generatedText += part.text
          updateData({ summary: generatedText.substring(0, MAX_CHARS) })
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to enhance summary. Ensure Puter is connected.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Professional Summary</h3>
          <p className="text-sm text-muted-foreground">A brief overview of your career, skills, and goals.</p>
        </div>
        <Button 
          onClick={handleEnhance} 
          disabled={isLoading} 
          size="sm" 
          variant="outline" 
          className="gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 border-purple-200"
        >
          <Sparkles className="h-4 w-4" />
          {isLoading ? 'Enhancing...' : 'AI Enhance'}
        </Button>
      </div>

      <div className="space-y-2 relative">
        <div className="flex justify-between items-center">
          <Label>Summary Text</Label>
          <span className="text-xs text-muted-foreground">{data.summary.length} / {MAX_CHARS}</span>
        </div>
        <Textarea 
          value={data.summary} 
          onChange={(e) => updateData({ summary: e.target.value.substring(0, MAX_CHARS) })} 
          placeholder="I am a highly motivated professional..." 
          className="h-48 resize-none"
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
