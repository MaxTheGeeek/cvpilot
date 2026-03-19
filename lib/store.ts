import { create } from 'zustand'

export interface PersonalInfo {
  firstName: string
  lastName: string
  currentRole: string
  email: string
  linkedin: string
  github: string
  portfolio: string
  location: string
  phone: string
  skills: string
}

export interface CompanyInfo {
  companyName: string
  companyLocation: string
  position: string
  contactPerson: string
  companyAspects: string
}



export interface CoverLetterState {
  // Current step in the form
  currentStep: 'settings' | 'personal' | 'company' | 'position' | 'content'

  // Letter Theme Color
  themeColor: 'blue' | 'green' | 'black' | 'gray'
  setThemeColor: (color: 'blue' | 'green' | 'black' | 'gray') => void

  // Language
  language: 'en' | 'de'
  setLanguage: (lang: 'en' | 'de') => void

  // Selected template
  selectedTemplate: string | null

  // Personal information
  personalInfo: PersonalInfo

  // Company information
  companyInfo: CompanyInfo

  // Cover letter content
  coverLetterContent: string

  // Generated file URL
  generatedFileUrl: string | null

  // Active tab
  activeTab: 'cv-creator' | 'merge-pdf'

  // PDF Merge state
  pdfFiles: File[]
  mergedPdfUrl: string | null
  isMerging: boolean

  // Actions
  setCurrentStep: (step: CoverLetterState['currentStep']) => void
  setPersonalInfo: (info: Partial<PersonalInfo>) => void
  setCompanyInfo: (info: Partial<CompanyInfo>) => void
  setCoverLetterContent: (content: string) => void
  setGeneratedFileUrl: (url: string | null) => void
  setActiveTab: (tab: CoverLetterState['activeTab']) => void

  // PDF Merge actions
  addPdfFile: (file: File) => void
  removePdfFile: (index: number) => void
  setMergedPdfUrl: (url: string | null) => void
  setIsMerging: (isMerging: boolean) => void
  clearPdfFiles: () => void

  // Reset form
  resetForm: () => void
  resetMergePdf: () => void
}

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  currentRole: '',
  email: '',
  linkedin: '',
  github: '',
  portfolio: '',
  location: '',
  phone: '',
  skills: '',
}

const defaultCompanyInfo: CompanyInfo = {
  companyName: '',
  companyLocation: '',
  position: '',
  contactPerson: '',
  companyAspects: '',
}

export const defaultLetterContentEn = `Dear Hiring Manager,

I am writing to express my strong interest in the open position. With my background and experience, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed strong skills relevant to this role. I am particularly drawn to your company because of its strong reputation and innovative approach.

I am excited about the opportunity to contribute to your team and would welcome the chance to discuss how my experience aligns with your needs.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]`

export const defaultLetterContentDe = `Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich mit großem Interesse um die offene Position. Aufgrund meiner bisherigen Erfahrungen bin ich überzeugt, einen wertvollen Beitrag zu Ihrem Team leisten zu können.

In meiner beruflichen Laufbahn konnte ich umfassende fachliche Kenntnisse erwerben. Besonders an Ihrem Unternehmen reizt mich die Innovationskraft und die Unternehmenskultur.

Ich freue mich über die Möglichkeit, meine Motivation und Qualifikationen in einem persönlichen Gespräch näher zu erläutern.

Vielen Dank für die Prüfung meiner Unterlagen.

Mit freundlichen Grüßen,
[Your Name]`

export const useCoverLetterStore = create<CoverLetterState>((set) => ({
  currentStep: 'settings',
  themeColor: 'blue',
  language: 'en',
  selectedTemplate: 'minimal',
  personalInfo: defaultPersonalInfo,
  companyInfo: defaultCompanyInfo,
  coverLetterContent: defaultLetterContentEn,
  generatedFileUrl: null,
  activeTab: 'cv-creator',
  pdfFiles: [],
  mergedPdfUrl: null,
  isMerging: false,

  setThemeColor: (color) => set({ themeColor: color }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setLanguage: (lang) => set((state) => ({
    language: lang,
    // Reset content to default language template if it was unedited
    coverLetterContent: state.coverLetterContent === defaultLetterContentEn || state.coverLetterContent === defaultLetterContentDe
      ? (lang === 'en' ? defaultLetterContentEn : defaultLetterContentDe)
      : state.coverLetterContent
  })),
  setPersonalInfo: (info) => set((state) => ({
    personalInfo: { ...state.personalInfo, ...info }
  })),
  setCompanyInfo: (info) => set((state) => ({
    companyInfo: { ...state.companyInfo, ...info }
  })),
  setCoverLetterContent: (content) => set({ coverLetterContent: content }),
  setGeneratedFileUrl: (url) => set({ generatedFileUrl: url }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  addPdfFile: (file) => set((state) => {
    if (state.pdfFiles.length >= 3) return state
    return { pdfFiles: [...state.pdfFiles, file] }
  }),
  removePdfFile: (index) => set((state) => ({
    pdfFiles: state.pdfFiles.filter((_, i) => i !== index)
  })),
  setMergedPdfUrl: (url) => set({ mergedPdfUrl: url }),
  setIsMerging: (isMerging) => set({ isMerging }),
  clearPdfFiles: () => set({ pdfFiles: [], mergedPdfUrl: null }),

  resetForm: () => set({
    currentStep: 'settings',
    selectedTemplate: 'minimal',
    themeColor: 'blue',
    language: 'en',
    personalInfo: defaultPersonalInfo,
    companyInfo: defaultCompanyInfo,
    coverLetterContent: defaultLetterContentEn,
    generatedFileUrl: null,
  }),

  resetMergePdf: () => set({
    pdfFiles: [],
    mergedPdfUrl: null,
    isMerging: false,
  }),
}))
