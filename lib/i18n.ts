export type Language = 'en' | 'de'

export const translations = {
  en: {
    summary: 'Summary',
    workExperience: 'Work Experience',
    skills: 'Skills',
    education: 'Education & Certificates',
    additionalInfo: 'Additional Information',
    present: 'Present',
  },
  de: {
    summary: 'Zusammenfassung',
    workExperience: 'Berufserfahrung',
    skills: 'Fähigkeiten',
    education: 'Ausbildung & Zertifikate',
    additionalInfo: 'Zusätzliche Informationen',
    present: 'Heute',
  }
}

export function t(key: keyof typeof translations['en'], lang: Language): string {
  return translations[lang][key] || translations['en'][key]
}
