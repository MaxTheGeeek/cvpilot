'use client'

import { useState } from 'react'
import { useResumeStore, WorkExperience } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trash2, Edit2, Plus } from 'lucide-react'

export function ExperienceForm() {
  const { data, addExperience, updateExperience, deleteExperience } = useResumeStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [currentExp, setCurrentExp] = useState<Partial<WorkExperience>>({})

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
            <Label>Description (Bullets separated by new lines)</Label>
            <Textarea 
              value={currentExp.description || ''} 
              onChange={(e) => setCurrentExp(prev => ({...prev, description: e.target.value}))} 
              placeholder="- Built new features&#10;- Led a team" 
              className="h-32"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentExp({}); }}>Cancel</Button>
          <Button onClick={handleSave}>Save Entry</Button>
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
