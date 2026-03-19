'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

export function SkillsForm() {
  const { data, updateData } = useResumeStore()
  const [newSkill, setNewSkill] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    updateData({ skills: [...data.skills, newSkill.trim()] })
    setNewSkill('')
  }

  const handleRemove = (index: number) => {
    const updated = [...data.skills]
    updated.splice(index, 1)
    updateData({ skills: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="text-sm text-muted-foreground">Add relevant professional skills.</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input 
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)} 
          placeholder="e.g. React.js, Public Speaking..." 
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm">
            <span>{skill}</span>
            <button
              onClick={() => handleRemove(idx)}
              className="text-muted-foreground hover:text-foreground inline-flex justify-center items-center ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {data.skills.length === 0 && (
          <div className="text-sm text-muted-foreground py-4">No skills added yet.</div>
        )}
      </div>
    </div>
  )
}
