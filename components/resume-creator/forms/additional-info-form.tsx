'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

export function AdditionalInfoForm() {
  const { data, updateData } = useResumeStore()
  const [newInfo, setNewInfo] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInfo.trim()) return
    updateData({ additionalInfo: [...data.additionalInfo, newInfo.trim()] })
    setNewInfo('')
  }

  const handleRemove = (index: number) => {
    const updated = [...data.additionalInfo]
    updated.splice(index, 1)
    updateData({ additionalInfo: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional Information</h3>
        <p className="text-sm text-muted-foreground">Add awards, spoken languages, volunteering, etc. (format: "Languages: English")</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input 
          value={newInfo} 
          onChange={(e) => setNewInfo(e.target.value)} 
          placeholder="e.g. Languages: English (Native), Spanish (Basic)" 
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {data.additionalInfo.map((info, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4 bg-muted/50 p-3 rounded-md border border-border/50 text-sm">
            <span className="leading-relaxed">{info}</span>
            <button
              onClick={() => handleRemove(idx)}
              className="text-muted-foreground hover:text-destructive shrink-0 mt-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {data.additionalInfo.length === 0 && (
          <div className="text-sm text-muted-foreground py-4 text-center border-2 border-dashed rounded-lg">
            No additional information added yet.
          </div>
        )}
      </div>
    </div>
  )
}
