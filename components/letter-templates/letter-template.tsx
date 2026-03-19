'use client'

import { useCoverLetterStore } from '@/lib/store'

export function LetterTemplate() {
  const { 
    personalInfo, 
    companyInfo, 
    coverLetterContent, 
    themeColor,
    language
  } = useCoverLetterStore()

  const colors = {
    blue: '#5873B2',
    green: '#166534',
    black: '#000000',
    gray: '#4b5563',
  }
  
  const accentColor = colors[themeColor] || colors.blue

  const labels = {
    en: {
      subject: 'Subject',
    },
    de: {
      subject: 'Betreff',
    }
  }

  const t = labels[language]

  // Format the date if valid
  let formattedDate = companyInfo.companyAspects
  if (formattedDate) {
    try {
      const d = new Date(formattedDate)
      formattedDate = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(d)
      
      // Specifically for German to match "18. März 2026"
      if (language === 'de') {
        formattedDate = new Intl.DateTimeFormat('de-DE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(d)
      }
    } catch (e) {
      // fallback to raw if error
    }
  }

  return (
    <div className="w-full bg-white p-[10%] text-gray-800 mx-auto aspect-[1/1.414] text-[11pt] leading-[1.6]">
      {/* Header - Personal Info */}
      <div className="flex flex-col text-left mb-16">
        <h1 
          className="text-2xl font-bold tracking-tight uppercase mb-1" 
          style={{ color: accentColor }}
        >
          {personalInfo.firstName || 'First Name'} {personalInfo.lastName || 'Last Name'}
        </h1>
        {personalInfo.currentRole && (
          <h2 className="text-[13pt] font-semibold mb-2" style={{ color: accentColor }}>
            {personalInfo.currentRole}
          </h2>
        )}
        
        <div className="flex flex-col text-[10pt] text-gray-700 leading-tight">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Company Info block */}
      <div className="flex flex-col text-[10pt] mb-2 leading-tight">
        {companyInfo.companyName ? (
           <span className="font-bold" style={{ color: accentColor }}>{companyInfo.companyName}</span>
        ) : (
           <span className="font-bold text-gray-400">Company Name</span>
        )}
        {companyInfo.contactPerson && <span>{companyInfo.contactPerson}</span>}
        {companyInfo.companyLocation && <span className="whitespace-pre-wrap">{companyInfo.companyLocation}</span>}
      </div>

      {/* Date directly below company info */}
      <div className="w-full text-left text-[10pt] mb-4">
        {formattedDate && <span>{formattedDate}</span>}
      </div>

      {/* Horizontal Divider Line */}
      <div 
        className="w-full h-[1px] mb-6" 
        style={{ backgroundColor: accentColor }} 
      />
      
      {/* Subject Line (Position) - Implicit or explicitly requested */}
      {(companyInfo.position && coverLetterContent === '') && (
        <div className="mb-6">
          <h2 className="text-[11pt] font-bold">
            {t.subject}: {companyInfo.position}
          </h2>
        </div>
      )}

      {/* Body Content */}
      <div className="whitespace-pre-wrap text-justify mt-2">
        {coverLetterContent}
      </div>
    </div>
  )
}
