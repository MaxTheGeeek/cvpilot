export interface Template {
  id: string
  name: string
  description: string
  style: 'modern' | 'classic' | 'creative' | 'minimal' | 'professional'
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

export const templates: Template[] = [
  {
    id: 'minimalist-blue',
    name: 'Minimalist Blue',
    description: 'Clean white background with blue clean typography',
    style: 'minimal',
    colors: { primary: '#5a76e0', secondary: '#5a76e0', accent: '#5a76e0' }
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and contemporary design with blue accents',
    style: 'modern',
    colors: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' }
  },
  {
    id: 'classic-black',
    name: 'Classic Elegance',
    description: 'Timeless black and white professional layout',
    style: 'classic',
    colors: { primary: '#171717', secondary: '#404040', accent: '#737373' }
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    description: 'Bold gradient header for creative professionals',
    style: 'creative',
    colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc' }
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Simple and sophisticated minimalist design',
    style: 'minimal',
    colors: { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db' }
  },
  {
    id: 'professional-navy',
    name: 'Professional Navy',
    description: 'Corporate navy blue for business roles',
    style: 'professional',
    colors: { primary: '#1e3a5f', secondary: '#2d4a6f', accent: '#3d5a80' }
  },
  {
    id: 'modern-teal',
    name: 'Modern Teal',
    description: 'Fresh teal tones for a standout impression',
    style: 'modern',
    colors: { primary: '#0d9488', secondary: '#14b8a6', accent: '#2dd4bf' }
  },
  {
    id: 'classic-burgundy',
    name: 'Classic Burgundy',
    description: 'Rich burgundy for executive positions',
    style: 'classic',
    colors: { primary: '#7f1d1d', secondary: '#991b1b', accent: '#b91c1c' }
  },
  {
    id: 'creative-coral',
    name: 'Creative Coral',
    description: 'Vibrant coral for design and marketing',
    style: 'creative',
    colors: { primary: '#f97316', secondary: '#fb923c', accent: '#fdba74' }
  },
  {
    id: 'minimal-sage',
    name: 'Minimal Sage',
    description: 'Calming sage green with clean lines',
    style: 'minimal',
    colors: { primary: '#4d7c0f', secondary: '#65a30d', accent: '#84cc16' }
  },
  {
    id: 'professional-slate',
    name: 'Professional Slate',
    description: 'Modern slate gray for tech industry',
    style: 'professional',
    colors: { primary: '#334155', secondary: '#475569', accent: '#64748b' }
  }
]
