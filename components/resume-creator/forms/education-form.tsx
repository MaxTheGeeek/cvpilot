'use client'

import { useState } from 'react'
import { useResumeStore, Education } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trash2, Edit2, Plus } from 'lucide-react'

export function EducationForm() {
  const { data, addEducation, updateEducation, deleteEducation } = useResumeStore()
  
  const [isEditing, setIsEditing] = useState(false)
  const [currentEdu, setCurrentEdu] = useState<Partial<Education>>({})

  const handleSave = () => {
    if (!currentEdu.institution || !currentEdu.degree) return
    
    if (currentEdu.id) {
      updateEducation(currentEdu.id, currentEdu)
    } else {
      addEducation({
        id: Math.random().toString(36).substr(2, 9),
        institution: currentEdu.institution || '',
        degree: currentEdu.degree || '',
        date: currentEdu.date || '',
        description: currentEdu.description || ''
      })
    }
    setIsEditing(false)
    setCurrentEdu({})
  }

  const handleEdit = (edu: Education) => {
    setCurrentEdu(edu)
    setIsEditing(true)
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{currentEdu.id ? 'Edit Education' : 'Add Education'}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input value={currentEdu.institution || ''} onChange={(e) => setCurrentEdu(prev => ({...prev, institution: e.target.value}))} placeholder="University Name" />
          </div>
          <div className="space-y-2">
            <Label>Degree / Certificate</Label>
            <Input value={currentEdu.degree || ''} onChange={(e) => setCurrentEdu(prev => ({...prev, degree: e.target.value}))} placeholder="Bachelor of Science" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Date Range</Label>
            <Input value={currentEdu.date || ''} onChange={(e) => setCurrentEdu(prev => ({...prev, date: e.target.value}))} placeholder="2018 - 2022" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description (Optional, separated by new lines)</Label>
            <Textarea 
              value={currentEdu.description || ''} 
              onChange={(e) => setCurrentEdu(prev => ({...prev, description: e.target.value}))} 
              placeholder="- Graduated with Honors" 
              className="h-32"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setIsEditing(false); setCurrentEdu({}); }}>Cancel</Button>
          <Button onClick={handleSave}>Save Entry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Education & Certificates</h3>
          <p className="text-sm text-muted-foreground">List your academic background and certifications.</p>
        </div>
        <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      <div className="space-y-4">
        {data.education.length === 0 && (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            No education added yet.
          </div>
        )}
        {data.education.map(edu => (
          <Card key={edu.id}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <CardDescription>{edu.institution} • {edu.date}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteEducation(edu.id)}>
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
