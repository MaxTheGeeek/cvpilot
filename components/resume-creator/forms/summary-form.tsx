'use client'

import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function SummaryForm() {
  const { data, updateData } = useResumeStore()

  const MAX_CHARS = 500

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Professional Summary</h3>
        <p className="text-sm text-muted-foreground">A brief overview of your career, skills, and goals.</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Summary Text</Label>
          <span className="text-xs text-muted-foreground">{data.summary.length} / {MAX_CHARS}</span>
        </div>
        <Textarea 
          value={data.summary} 
          onChange={(e) => updateData({ summary: e.target.value.substring(0, MAX_CHARS) })} 
          placeholder="I am a highly motivated professional..." 
          className="h-48 resize-none"
        />
      </div>
    </div>
  )
}
