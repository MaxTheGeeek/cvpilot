import { create } from 'zustand'

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  linkedin: string
  github: string
  portfolio: string
  location: string
  phone: string
}

export interface CompanyInfo {
  companyName: string
  companyLocation: string
  position: string
  contactPerson: string
}

export interface CoverLetterState {
  // Current step in the form
  currentStep: 'templates' | 'personal' | 'company' | 'review' | 'generating' | 'download'
  
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
  setSelectedTemplate: (templateId: string | null) => void
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
  email: '',
  linkedin: '',
  github: '',
  portfolio: '',
  location: '',
  phone: '',
}

const defaultCompanyInfo: CompanyInfo = {
  companyName: '',
  companyLocation: '',
  position: '',
  contactPerson: '',
}

const defaultCoverLetterContent = `Dear Hiring Manager,

I am writing to express my strong interest in the [Position] position at [Company Name]. With my background and experience, I am confident that I would be a valuable addition to your team.

Throughout my career, I have developed strong skills in [relevant skills]. I am particularly drawn to [Company Name] because of [company attributes that appeal to you].

I am excited about the opportunity to contribute to your team and would welcome the chance to discuss how my experience aligns with your needs.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]`

export const useCoverLetterStore = create<CoverLetterState>((set) => ({
  currentStep: 'templates',
  selectedTemplate: null,
  personalInfo: defaultPersonalInfo,
  companyInfo: defaultCompanyInfo,
  coverLetterContent: defaultCoverLetterContent,
  generatedFileUrl: null,
  activeTab: 'cv-creator',
  pdfFiles: [],
  mergedPdfUrl: null,
  isMerging: false,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
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
    currentStep: 'templates',
    selectedTemplate: null,
    personalInfo: defaultPersonalInfo,
    companyInfo: defaultCompanyInfo,
    coverLetterContent: defaultCoverLetterContent,
    generatedFileUrl: null,
  }),
  
  resetMergePdf: () => set({
    pdfFiles: [],
    mergedPdfUrl: null,
    isMerging: false,
  }),
}))
