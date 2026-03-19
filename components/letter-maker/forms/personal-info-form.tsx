'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function PersonalInfoForm() {
  const { personalInfo, setPersonalInfo, setCurrentStep } = useCoverLetterStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo({ [name]: value })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter your contact details to display in the letter header.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleChange} placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleChange} placeholder="Doe" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="currentRole">Current Role / Output Title</Label>
          <Input id="currentRole" name="currentRole" value={personalInfo.currentRole || ''} onChange={handleChange} placeholder="Frontend Developer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} placeholder="john.doe@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" value={personalInfo.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location">Address</Label>
          <Input id="location" name="location" value={personalInfo.location} onChange={handleChange} placeholder="123 Main St, City, Country" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
          <Input id="portfolio" name="portfolio" value={personalInfo.portfolio} onChange={handleChange} placeholder="johndoe.com" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setCurrentStep('settings')}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep('company')}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
