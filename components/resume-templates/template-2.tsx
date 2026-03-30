import React from 'react'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { t } from '@/lib/i18n'

export function Template2() {
  const { data, language, themeColor, sectionOrder } = useResumeStore()

  // Color mappings
  const colorMap = {
    blue: '#5873B2',
    green: '#166534',
    black: '#000000',
    gray: '#4b5563'
  }
  const primaryColor = colorMap[themeColor] || colorMap.blue

  const formatBullets = (text?: string) => {
    if (!text) return null
    const bullets = text.split('\n').filter(b => b.trim() !== '')
    return (
      <ul className="bullets">
        {bullets.map((bullet, idx) => (
          <li key={idx}>{bullet.replace(/^- /, '')}</li>
        ))}
      </ul>
    )
  }

  const buildContactString = () => {
    const parts = [data.address, data.phone, data.email, data.portfolio, data.linkedin].filter(Boolean)
    return parts.join('  |  ')
  }

  return (
    <div 
      className="page target-t2"
      style={{
        fontFamily: "'Lato', sans-serif",
        background: '#ffffff',
        padding: '44px 48px 44px 48px',
        color: '#1e1e1e',
        width: '100%',
        minHeight: '100%'
      }}
    >
      <style>{`
        .target-t2 .header-name { font-size: 36px; font-weight: 900; letter-spacing: 0.5px; line-height: 1.1; text-transform: uppercase; }
        .target-t2 .header-title { font-size: 18px; font-weight: 900; margin-top: 4px; text-transform: uppercase; }
        .target-t2 .header-contact { font-size: 12px; color: #3a3a3a; margin-top: 5px; }

        .target-t2 .section { margin-top: 18px; }
        .target-t2 .section-title { 
            background: #d9d9d9; border-radius: 4px; padding: 6px 14px; 
            font-size: 12.5px; font-weight: 700; font-style: italic; 
            letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 10px; 
            color: #ffffff;
        }

        .target-t2 .summary-text { font-size: 12px; line-height: 1.7; color: #2a2a2a; text-align: justify; }

        .target-t2 .entry { margin-bottom: 13px; }
        .target-t2 .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
        .target-t2 .entry-company { font-size: 12.5px; font-weight: 700; color: #1a1a1a; }
        .target-t2 .entry-dates { font-size: 12.5px; font-weight: 700; color: #1a1a1a; white-space: nowrap; }
        .target-t2 .entry-subtitle { font-size: 12px; color: #3a3a3a; margin-top: 1px; }

        .target-t2 ul.bullets { list-style: disc; padding-left: 22px; margin-top: 5px; }
        .target-t2 ul.bullets li { font-size: 12px; line-height: 1.65; color: #2a2a2a; }

        .target-t2 .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 0; }
        .target-t2 .skills-grid span { font-size: 12px; line-height: 1.85; color: #2a2a2a; }
      `}</style>

      {/* 1. NAME */}
      <div className="header-name" style={{ color: primaryColor }}>{data.firstName} {data.lastName}</div>

      {/* 2. ROLE */}
      <div className="header-title" style={{ color: primaryColor }}>{data.roleTitle}</div>

      {/* 3. CONTACT & ADDRESS */}
      <div className="header-contact">
        {buildContactString()}
      </div>

      {sectionOrder.map((section: string) => {
        if (section === 'summary' && data.summary) {
          return (
            <div className="section" key="summary">
              <div className="section-title" style={{ background: primaryColor }}>{t('summary', language)}</div>
              <p className="summary-text whitespace-pre-wrap">{data.summary}</p>
            </div>
          )
        }
        if (section === 'experience' && data.experience.length > 0) {
          return (
            <div className="section" key="experience">
              <div className="section-title" style={{ background: primaryColor }}>{t('workExperience', language)}</div>
              {data.experience.map(exp => (
                <div className="entry" key={exp.id}>
                  <div className="entry-header">
                    <span className="entry-company">{exp.role}, {exp.company}</span>
                    <span className="entry-dates">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  {formatBullets(exp.description)}
                </div>
              ))}
            </div>
          )
        }
        if (section === 'skills' && data.skills.length > 0) {
          return (
            <div className="section" key="skills">
              <div className="section-title" style={{ background: primaryColor }}>{t('skills', language)}</div>
              <div className="skills-grid">
                {data.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
          )
        }
        if (section === 'education' && data.education.length > 0) {
          return (
            <div className="section" key="education">
              <div className="section-title" style={{ background: primaryColor }}>{t('education', language)}</div>
              {data.education.map(edu => (
                <div className="entry" key={edu.id}>
                  <div className="entry-header">
                    <span className="entry-company">{edu.degree}</span>
                    <span className="entry-dates">{edu.date}</span>
                  </div>
                  <div className="entry-subtitle">{edu.institution}</div>
                  {formatBullets(edu.description)}
                </div>
              ))}
            </div>
          )
        }
        if (section === 'additionalInfo' && data.additionalInfo.length > 0) {
          return (
            <div className="section" key="additionalInfo">
              <div className="section-title" style={{ background: primaryColor }}>{t('additionalInfo', language)}</div>
              <ul className="bullets">
                {data.additionalInfo.map((info, i) => (
                  <li key={i}>
                    {(() => {
                      const colonIndex = info.indexOf(':');
                      if (colonIndex > -1) {
                        return (
                          <React.Fragment>
                            <strong>{info.slice(0, colonIndex + 1)}</strong>{info.slice(colonIndex + 1)}
                          </React.Fragment>
                        )
                      }
                      return info;
                    })()}
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        return null
      })}

    </div>
  )
}
