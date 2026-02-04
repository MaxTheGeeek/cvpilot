'use client'

import { Template } from '@/lib/templates'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onSelect: (id: string) => void
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(template.id)}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border-2 bg-card text-left transition-all duration-200 hover:shadow-lg',
        isSelected 
          ? 'border-primary ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* Template Preview */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/50">
        {/* Mock document preview */}
        <div className="absolute inset-3 flex flex-col rounded-md bg-background shadow-sm">
          {/* Header bar */}
          <div 
            className="h-8 rounded-t-md"
            style={{ backgroundColor: template.colors.primary }}
          />
          {/* Content lines */}
          <div className="flex-1 space-y-2 p-3">
            <div 
              className="h-3 w-3/4 rounded-full"
              style={{ backgroundColor: template.colors.primary + '40' }}
            />
            <div className="h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-5/6 rounded-full bg-muted" />
            <div className="h-2 w-4/6 rounded-full bg-muted" />
            <div className="mt-3 h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-3/4 rounded-full bg-muted" />
          </div>
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Check className="h-4 w-4" />
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/5">
          <span className={cn(
            'rounded-full px-4 py-2 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100',
            isSelected ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground shadow-md'
          )}>
            {isSelected ? 'Selected' : 'Select Template'}
          </span>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="flex flex-col gap-1 p-4">
        <h3 className="font-semibold text-foreground">{template.name}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
        
        {/* Color swatches */}
        <div className="mt-2 flex gap-1.5">
          {Object.values(template.colors).map((color, idx) => (
            <div
              key={idx}
              className="h-4 w-4 rounded-full ring-1 ring-border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </button>
  )
}
