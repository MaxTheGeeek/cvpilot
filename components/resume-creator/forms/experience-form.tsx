'use client'

import { useState } from 'react'
import { useResumeStore, WorkExperience } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trash2, Edit2, Plus, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { puter } from '@heyputer/puter.js'

export function ExperienceForm() {
  const { data, addExperience, updateExperience, deleteExperience } = useResumeStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentExp, setCurrentExp] = useState<Partial<WorkExperience>>({})

  const handleEnhance = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    try {
      const isGeneratingFromScratch = !currentExp.description?.trim();
      const prompt = `You are an expert ATS resume writer.
${isGeneratingFromScratch 
  ? `Generate 3-4 highly impactful, action-oriented bullet points for a ${currentExp.role || data.roleTitle || 'Professional'} working at ${currentExp.company || 'a company'}.`
  : `Rewrite the following work experience description to be more impactful, action-oriented, and ATS-friendly for a ${currentExp.role || data.roleTitle || 'Professional'}.`
}

Format the output strictly as a bulleted list, where each bullet point starts with a hyphen "-".
Focus on quantifiable achievements and strong action verbs.
Do not include conversational text or placeholders. Just output the bullet points.

${isGeneratingFromScratch ? '' : `Please enhance this text:\n\n${currentExp.description}`}`

      const response = await puter.ai.chat(prompt, { stream: true })
      
      let generatedText = ''
      for await (const part of response) {
        if (part?.text) {
          generatedText += part.text
          setCurrentExp(prev => ({ ...prev, description: generatedText }))
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to enhance experience. Ensure Puter is connected.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (!currentExp.company || !currentExp.role) return
    
    if (currentExp.id) {
      updateExperience(currentExp.id, currentExp)
    } else {
      addExperience({
        id: Math.random().toString(36).substr(2, 9),
        company: currentExp.company || '',
        role: currentExp.role || '',
        startDate: currentExp.startDate || '',
        endDate: currentExp.endDate || '',
        description: currentExp.description || ''
      })
    }
    setIsEditing(false)
    setCurrentExp({})
  }

  const handleEdit = (exp: WorkExperience) => {
    setCurrentExp(exp)
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{currentExp.id ? 'Edit Experience' : 'Add Experience'}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input value={currentExp.company || ''} onChange={(e) => setCurrentExp(prev => ({...prev, company: e.target.value}))} placeholder="Acme Corp" />
          </div>
          <div className="space-y-2">
            <Label>Role Title</Label>
            <Input value={currentExp.role || ''} onChange={(e) => setCurrentExp(prev => ({...prev, role: e.target.value}))} placeholder="Senior Developer" />
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input value={currentExp.startDate || ''} onChange={(e) => setCurrentExp(prev => ({...prev, startDate: e.target.value}))} placeholder="Jan 2020" />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input value={currentExp.endDate || ''} onChange={(e) => setCurrentExp(prev => ({...prev, endDate: e.target.value}))} placeholder="Present" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <Label>Description (Bullets separated by new lines)</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEnhance} 
                disabled={isLoading || !currentExp.description} 
                className="gap-1 h-7 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
              >
                <Sparkles className="h-3 w-3" />
                {isLoading ? 'Enhancing...' : 'AI Enhance'}
              </Button>
            </div>
            <Textarea 
              value={currentExp.description || ''} 
              onChange={(e) => setCurrentExp(prev => ({...prev, description: e.target.value}))} 
              placeholder="- Built new features&#10;- Led a team" 
              className="h-32"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentExp({}); }} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>Save Entry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Work Experience</h3>
          <p className="text-sm text-muted-foreground">List your previous work experiences.</p>
        </div>
        <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      <div className="space-y-4">
        {data.experience.length === 0 && (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            No experiences added yet.
          </div>
        )}
        {data.experience.map(exp => (
          <Card key={exp.id}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{exp.role}</CardTitle>
                  <CardDescription>{exp.company} • {exp.startDate} - {exp.endDate}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteExperience(exp.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
