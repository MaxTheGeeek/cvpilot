'use client'

import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown } from 'lucide-react'

export function SettingsForm() {
  const { 
    template, language, themeColor, sectionOrder,
    setTemplate, setLanguage, setThemeColor, setSectionOrder 
  } = useResumeStore()

  const colors = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'black', label: 'Black' },
    { value: 'gray', label: 'Gray' }
  ]

  const sectionLabels: Record<string, string> = {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    skills: 'Skills',
    education: 'Education',
    additionalInfo: 'Additional Information'
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder]
    if (direction === 'up' && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      setSectionOrder(newOrder)
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]]
      setSectionOrder(newOrder)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Resume Settings</h3>
        <p className="text-sm text-muted-foreground">Customize the global look and feel of your resume.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Template</Label>
          <Select value={template} onValueChange={(v: any) => setTemplate(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template-1">Classic Modern (Template 1)</SelectItem>
              <SelectItem value="template-2">Creative Minimal (Template 2)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={language} onValueChange={(v: any) => setLanguage(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (EN)</SelectItem>
              <SelectItem value="de">German (DE)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Theme Color</Label>
          <Select value={themeColor} onValueChange={(v: any) => setThemeColor(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map(color => {
                const hexColor = color.value === 'blue' ? '#2b6a9e' : 
                                 color.value === 'green' ? '#2d8a56' : 
                                 color.value === 'black' ? '#1a1a1a' : '#4b5563';
                return (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hexColor }}></div>
                      {color.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div>
          <Label className="text-base font-medium">Section Ordering</Label>
          <p className="text-xs text-muted-foreground mt-1 mb-3">Adjust the order of sections on your resume by using the arrows.</p>
        </div>
        
        <div className="space-y-2 bg-muted/30 p-3 rounded-lg border border-border/50">
          {sectionOrder.map((section, index) => (
            <div key={section} className="flex items-center justify-between bg-background p-2 px-3 rounded text-sm border shadow-sm">
              <span className="font-medium text-foreground">{sectionLabels[section] || section}</span>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sectionOrder.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
