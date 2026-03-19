'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function SettingsForm() {
  const { 
    language, 
    setLanguage, 
    themeColor, 
    setThemeColor,
    setCurrentStep 
  } = useCoverLetterStore()

  const colors = [
    { id: 'blue', name: 'Blue', hex: '#5873B2' },
    { id: 'green', name: 'Green', hex: '#166534' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'gray', name: 'Dark Gray', hex: '#4b5563' },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-medium">Letter Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure the language and accent color for your cover letter.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select 
            value={language} 
            onValueChange={(value: 'en' | 'de') => setLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Switching languages will reset any unedited letter content to its default base template.
          </p>
        </div>

        <div className="space-y-3">
          <Label>Theme Color</Label>
          <div className="flex gap-4">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setThemeColor(color.id as any)}
                className={`group relative h-10 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  themeColor === color.id ? 'border-primary ring-2 ring-ring ring-offset-2' : 'border-transparent'
                }`}
                title={color.name}
              >
                <span 
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => setCurrentStep('personal')}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
