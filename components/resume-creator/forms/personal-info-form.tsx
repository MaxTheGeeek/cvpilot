'use client'

import { useResumeStore } from '@/lib/store/useResumeStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function PersonalInfoForm() {
  const { data, updateData } = useResumeStore()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">Add your contact details and role title.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input value={data.firstName} onChange={(e) => updateData({ firstName: e.target.value })} placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input value={data.lastName} onChange={(e) => updateData({ lastName: e.target.value })} placeholder="Doe" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Role Title</Label>
          <Input value={data.roleTitle} onChange={(e) => updateData({ roleTitle: e.target.value })} placeholder="Software Engineer" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Address</Label>
          <Input value={data.address} onChange={(e) => updateData({ address: e.target.value })} placeholder="City, Country" />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input value={data.phone} onChange={(e) => updateData({ phone: e.target.value })} placeholder="+1 234 567 890" />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={data.email} onChange={(e) => updateData({ email: e.target.value })} placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <Label>Portfolio / Website (Optional)</Label>
          <Input value={data.portfolio} onChange={(e) => updateData({ portfolio: e.target.value })} placeholder="johndoe.com" />
        </div>
        <div className="space-y-2">
          <Label>LinkedIn (Optional)</Label>
          <Input value={data.linkedin} onChange={(e) => updateData({ linkedin: e.target.value })} placeholder="linkedin.com/in/johndoe" />
        </div>
      </div>
    </div>
  )
}
