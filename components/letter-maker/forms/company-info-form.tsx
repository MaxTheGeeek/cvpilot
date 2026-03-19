'use client'

import { useCoverLetterStore } from '@/lib/store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function CompanyInfoForm() {
  const { companyInfo, setCompanyInfo, setCurrentStep } = useCoverLetterStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyInfo({ [name]: value })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-medium">Company Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the details of the company you are applying to.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" value={companyInfo.companyName} onChange={handleChange} placeholder="Acme Corp" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="companyLocation">Company Address</Label>
          <Input id="companyLocation" name="companyLocation" value={companyInfo.companyLocation} onChange={handleChange} placeholder="456 Tech Park, Business City" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contactPerson">Contact Person (Optional)</Label>
          <Input id="contactPerson" name="contactPerson" value={companyInfo.contactPerson} onChange={handleChange} placeholder="Jane Smith" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="companyAspects">Date</Label>
          <Input id="companyAspects" name="companyAspects" type="date" value={companyInfo.companyAspects} onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setCurrentStep('personal')}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep('position')}>
          Next Step
        </Button>
      </div>
    </div>
  )
}
