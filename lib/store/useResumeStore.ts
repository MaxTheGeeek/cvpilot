import { create } from 'zustand'

export type ThemeColor = 'blue' | 'green' | 'black' | 'gray'

export interface WorkExperience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string // "Present" or date
  description: string // Array of bullets can be split by newline
}

export interface Education {
  id: string
  institution: string
  degree: string
  date: string
  description?: string
}

export interface ResumeData {
  firstName: string
  lastName: string
  roleTitle: string
  address: string
  phone: string
  email: string
  portfolio: string
  linkedin: string
  summary: string
  experience: WorkExperience[]
  skills: string[]
  education: Education[]
  additionalInfo: string[]
}

export const defaultResumeData: ResumeData = {
  firstName: 'Marcus',
  lastName: 'Thornton',
  roleTitle: 'Full-Stack Developer',
  address: '47 Maple Grove Ave., Springfield, IL 62701',
  phone: '+1-312-555-0187',
  email: 'marcus.thornton@devmail.io',
  portfolio: 'marcusthornton.dev',
  linkedin: 'linkedin.com/in/marcusthornton',
  summary: 'Results-driven full-stack developer with 6 years of experience designing, building, and scaling web applications across various industries. Adept at translating complex business requirements into clean, maintainable code. Strong communicator with a track record of leading cross-functional teams and delivering projects on time.',
  experience: [
    {
      id: '1',
      company: 'Nexora Technologies',
      role: 'Full-Stack Developer',
      startDate: '12 January, 2030',
      endDate: 'Present',
      description: '- Led development of customer-facing dashboards using React and Node.js.\n- Architected RESTful APIs consumed by both web and mobile clients.\n- Reduced page load time by 40% through performance profiling and code splitting.\n- Mentored two junior developers through weekly code reviews and pair programming sessions.'
    },
    {
      id: '2',
      company: 'Brightline Digital',
      role: 'Junior Web Developer',
      startDate: '03 March, 2027',
      endDate: '18 November, 2029',
      description: '- Built and maintained marketing websites for a portfolio of 15+ clients.\n- Collaborated with designers to implement pixel-perfect UI components.\n- Integrated third-party APIs including Stripe, Mailchimp, and Google Analytics.\n- Authored internal documentation that reduced onboarding time by 30%.'
    }
  ],
  skills: [
    'React / Vue.js / Next.js',
    'Node.js / Express',
    'PostgreSQL / MongoDB',
    'REST API Design',
    'Docker / CI/CD',
    'AWS (EC2, S3, RDS)',
    'TypeScript',
    'Git & Version Control',
    'Technical Documentation'
  ],
  education: [
    {
      id: '1',
      institution: 'Lakewood State University',
      degree: 'Bachelor of Science in Computer Science',
      date: '2021 – 2025',
      description: '- Relevant coursework in Distributed Systems, Software Architecture, and Database Engineering.'
    },
    {
      id: '2',
      institution: 'Amazon Web Services',
      degree: 'AWS Certified Developer – Associate',
      date: 'Issued June 2026'
    }
  ],
  additionalInfo: [
    'Languages: English (native), German (B2), Spanish (conversational).',
    'Awards: Best Engineer of the Quarter – Nexora Technologies (Q3 2031).'
  ]
}

interface ResumeStore {
  template: 'template-1' | 'template-2'
  language: 'en' | 'de'
  themeColor: ThemeColor
  sectionOrder: string[]
  data: ResumeData
  
  setTemplate: (template: 'template-1' | 'template-2') => void
  setLanguage: (lang: 'en' | 'de') => void
  setThemeColor: (color: ThemeColor) => void
  setSectionOrder: (order: string[]) => void
  updateData: (data: Partial<ResumeData>) => void
  addExperience: (exp: WorkExperience) => void
  updateExperience: (id: string, exp: Partial<WorkExperience>) => void
  deleteExperience: (id: string) => void
  
  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  deleteEducation: (id: string) => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
  template: 'template-1',
  language: 'en',
  themeColor: 'blue',
  sectionOrder: ['summary', 'experience', 'skills', 'education', 'additionalInfo'],
  data: defaultResumeData,
  
  setTemplate: (template) => set({ template }),
  setLanguage: (language) => set({ language }),
  setThemeColor: (themeColor) => set({ themeColor }),
  setSectionOrder: (sectionOrder) => set({ sectionOrder }),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  
  addExperience: (exp) => set((state) => ({ data: { ...state.data, experience: [...state.data.experience, exp] } })),
  updateExperience: (id, exp) => set((state) => ({ 
    data: { ...state.data, experience: state.data.experience.map(e => e.id === id ? { ...e, ...exp } : e) } 
  })),
  deleteExperience: (id) => set((state) => ({ 
    data: { ...state.data, experience: state.data.experience.filter(e => e.id !== id) } 
  })),
  
  addEducation: (edu) => set((state) => ({ data: { ...state.data, education: [...state.data.education, edu] } })),
  updateEducation: (id, edu) => set((state) => ({ 
    data: { ...state.data, education: state.data.education.map(e => e.id === id ? { ...e, ...edu } : e) } 
  })),
  deleteEducation: (id) => set((state) => ({ 
    data: { ...state.data, education: state.data.education.filter(e => e.id !== id) } 
  })),
}))
