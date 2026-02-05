export interface Template {
  id: string
  name: string
  description: string
  style: 'modern' | 'classic' | 'creative' | 'minimal' | 'professional'
  image?: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

export const templates: Template[] = [
  {
    id: 'blue-header',
    name: 'Blue Header',
    description: 'Professional design with a bold blue header',
    style: 'professional',
    image: '/templates/blue-header.png',
    colors: { primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' }
  },
  {
    id: 'green-line',
    name: 'Green Line sidebar',
    description: 'Modern layout with a distinctive green sidebar line',
    style: 'modern',
    image: '/templates/green-line.png',
    colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399' }
  },
  {
    id: 'green-header',
    name: 'Green Header',
    description: 'Fresh and vibrant design with green accents',
    style: 'creative',
    image: '/templates/green-header.png',
    colors: { primary: '#059669', secondary: '#047857', accent: '#10b981' }
  },
  {
    id: 'golden-header',
    name: 'Golden Header',
    description: 'Elegant design with golden touches',
    style: 'classic',
    image: '/templates/golden-header.png',
    colors: { primary: '#d97706', secondary: '#b45309', accent: '#f59e0b' }
  },
  {
    id: 'simple-white',
    name: 'Simple White',
    description: 'Clean and minimalist white layout',
    style: 'minimal',
    image: '/templates/simple-white.png',
    colors: { primary: '#374151', secondary: '#1f2937', accent: '#4b5563' }
  },
  {
    id: 'blue-infobox',
    name: 'Blue Info Box',
    description: 'Structured layout with a dedicated info box',
    style: 'modern',
    image: '/templates/blue-infobox.png',
    colors: { primary: '#2563eb', secondary: '#1d4ed8', accent: '#60a5fa' }
  },
  {
    id: 'black-footer',
    name: 'Black Footer',
    description: 'Sophisticated design with a strong footer',
    style: 'professional',
    image: '/templates/black-footer.png',
    colors: { primary: '#111827', secondary: '#000000', accent: '#374151' }
  },
  {
    id: 'yellow-header',
    name: 'Yellow Header',
    description: 'Bright and energetic design',
    style: 'creative',
    image: '/templates/yellow-header.png',
    colors: { primary: '#ca8a04', secondary: '#a16207', accent: '#eab308' }
  },
  {
    id: 'green-title',
    name: 'Green Title',
    description: 'Focus on typography with green titles',
    style: 'creative',
    image: '/templates/green-title.png',
    colors: { primary: '#16a34a', secondary: '#15803d', accent: '#22c55e' }
  }
]
