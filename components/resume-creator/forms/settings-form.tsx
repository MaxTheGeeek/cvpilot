'use client'

import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SettingsForm() {
  const { template, language, themeColor, setTemplate, setLanguage, setThemeColor } = useResumeStore()

  const colors = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'black', label: 'Black' },
    { value: 'gray', label: 'Gray' }
  ]

  return (
    <div className="space-y-6">
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
    </div>
  )
}
