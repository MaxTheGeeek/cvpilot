'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function PositionForm() {
  const { companyInfo, setCompanyInfo, setCurrentStep } = useCoverLetterStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyInfo({ [name]: value })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-medium">Position</h3>
        <p className="text-sm text-muted-foreground">
          What role are you applying for? This will be used in your subject line and auto-generated content.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="position">Job Title / Role</Label>
          <Input 
            id="position" 
            name="position" 
            value={companyInfo.position} 
            onChange={handleChange} 
            placeholder="e.g. Senior Frontend Developer" 
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setCurrentStep('company')}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep('content')}>
          Generate Content
        </Button>
      </div>
    </div>
  )
}
