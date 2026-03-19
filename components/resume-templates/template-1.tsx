import React from 'react'
import { useResumeStore } from '@/lib/store/useResumeStore'
import { t } from '@/lib/i18n'

export function Template1() {
  const { data, language, themeColor } = useResumeStore()

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
      className="page"
      style={{
        fontFamily: "'Lato', sans-serif",
        background: '#ffffff',
        padding: '48px 52px 40px 52px',
        color: '#2c2c2c',
        width: '100%',
        minHeight: '100%'
      }}
    >
      <style>{`
        .target-t1 .header-name { font-size: 32px; font-weight: 900; letter-spacing: 1px; color: #1a1a1a; text-transform: uppercase; }
        .target-t1 .header-rule { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
        .target-t1 .header-rule .title { font-size: 14.5px; font-weight: 700; white-space: nowrap; }
        .target-t1 .header-rule .line { flex: 1; height: 1.5px; }
        .target-t1 .header-contact { font-size: 12.5px; color: #2c2c2c; margin-top: 6px; }
        
        .target-t1 .section { margin-top: 20px; }
        .target-t1 .section-title { font-size: 12.5px; font-weight: 900; letter-spacing: 0.6px; text-transform: uppercase; padding-bottom: 4px; border-bottom: 1.5px solid; margin-bottom: 10px; }
        
        .target-t1 .summary-text { font-size: 12.5px; line-height: 1.65; padding-left: 10px; color: #2c2c2c; }
        
        .target-t1 .entry { margin-bottom: 14px; }
        .target-t1 .entry-company { font-size: 12.5px; font-weight: 700; color: #2c2c2c; }
        .target-t1 .entry-role { font-size: 12.5px; color: #2c2c2c; margin-top: 1px; }
        .target-t1 .entry-role span { font-weight: 400; }
        
        .target-t1 ul.bullets { list-style: disc; padding-left: 28px; margin-top: 5px; }
        .target-t1 ul.bullets li { font-size: 12px; line-height: 1.65; color: #2c2c2c; }
        
        .target-t1 .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); padding-left: 10px; gap: 1px 0; }
        .target-t1 .skills-grid span { font-size: 12px; line-height: 1.85; color: #2c2c2c; }
      `}</style>

      <div className="target-t1">
        {/* 1. NAME */}
        <div className="header-name">{data.firstName} {data.lastName}</div>

        {/* 2. ROLE */}
        <div className="header-rule">
          <span className="title" style={{ color: primaryColor }}>{data.roleTitle}</span>
          <span className="line" style={{ background: primaryColor }}></span>
        </div>

        {/* 3. CONTACT & ADDRESS */}
        <div className="header-contact">
          {buildContactString()}
        </div>

        {/* 4. SUMMARY */}
        {data.summary && (
          <div className="section">
            <div className="section-title" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
              {t('summary', language)}
            </div>
            <p className="summary-text whitespace-pre-wrap">{data.summary}</p>
          </div>
        )}

        {/* 5. WORK EXPERIENCE */}
        {data.experience.length > 0 && (
          <div className="section">
            <div className="section-title" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
              {t('workExperience', language)}
            </div>
            {data.experience.map(exp => (
              <div className="entry" key={exp.id}>
                <div className="entry-company">{exp.company}</div>
                <div className="entry-role">{exp.role} &nbsp;|&nbsp; <span>{exp.startDate} – {exp.endDate}</span></div>
                {formatBullets(exp.description)}
              </div>
            ))}
          </div>
        )}

        {/* 6. SKILLS */}
        {data.skills.length > 0 && (
          <div className="section">
            <div className="section-title" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
              {t('skills', language)}
            </div>
            <div className="skills-grid">
              {data.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* 7. EDUCATION */}
        {data.education.length > 0 && (
          <div className="section">
            <div className="section-title" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
              {t('education', language)}
            </div>
            {data.education.map(edu => (
              <div className="entry" key={edu.id}>
                <div className="entry-company">{edu.degree}</div>
                <div className="entry-role">{edu.institution} &nbsp;|&nbsp; <span>{edu.date}</span></div>
                {formatBullets(edu.description)}
              </div>
            ))}
          </div>
        )}

        {/* 8. ADDITIONAL INFORMATION */}
        {data.additionalInfo.length > 0 && (
          <div className="section">
            <div className="section-title" style={{ color: primaryColor, borderBottomColor: primaryColor }}>
              {t('additionalInfo', language)}
            </div>
            <ul className="bullets">
              {data.additionalInfo.map((info, i) => (
                <li key={i}>
                  {(() => {
                    const colonIndex = info.indexOf(':');
                    if (colonIndex > -1) {
                      return (
                        <>
                          <strong>{info.slice(0, colonIndex + 1)}</strong>{info.slice(colonIndex + 1)}
                        </>
                      )
                    }
                    return info;
                  })()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
