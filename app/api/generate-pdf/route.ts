import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { jsPDF } from 'jspdf'
import { templates } from '@/lib/templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { personalInfo, companyInfo, coverLetterContent, templateId, userId } = body

    // Find the selected template
    const template = templates.find(t => t.id === templateId) || templates[0]

    // Create PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    if (templateId === 'minimalist-blue') {
      generateMinimalistLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
    } else {
      generateStandardLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
    }

    // Generate PDF as base64
    const pdfBase64 = doc.output('datauristring')

    // If user is logged in, save to database
    if (userId) {
      const supabase = await createClient()

      await supabase.from('user_documents').insert({
        user_id: userId,
        document_type: 'cover_letter',
        file_name: `cover-letter-${companyInfo.companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        file_url: pdfBase64,
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        email: personalInfo.email,
        linkedin: personalInfo.linkedin,
        github: personalInfo.github || null,
        portfolio: personalInfo.portfolio || null,
        location: personalInfo.location,
        phone: personalInfo.phone,
        company_name: companyInfo.companyName,
        company_location: companyInfo.companyLocation || null,
        position: companyInfo.position,
        contact_person: companyInfo.contactPerson || null,
        cover_letter_content: coverLetterContent,
        template_id: templateId
      })
    }

    return NextResponse.json({
      success: true,
      downloadUrl: pdfBase64
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

function generateMinimalistLayout(doc: jsPDF, template: any, personalInfo: any, companyInfo: any, content: string) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20

  // Set Blue Color
  const blueColor = template.colors.primary

  // 1. Name (Uppercase, Blue, Bold)
  doc.setTextColor(blueColor)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  const name = `${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase()
  doc.text(name, margin, 25)

  // 2. Personal Info (Stacked below name, small, grey)
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  let infoY = 32
  const infoGap = 4

  if (personalInfo.location) {
    doc.text(personalInfo.location, margin, infoY)
    infoY += infoGap
  }
  if (personalInfo.email) {
    doc.text(personalInfo.email, margin, infoY)
    infoY += infoGap
  }
  // Websites combined
  const websites = [
    personalInfo.portfolio,
    personalInfo.linkedin,
    personalInfo.github
  ].filter(Boolean).join(' | ')
  if (websites) {
    doc.text(websites, margin, infoY)
    infoY += infoGap
  }

  if (personalInfo.phone) {
    doc.text(personalInfo.phone, margin, infoY)
    infoY += infoGap
  }

  // 3. Separator component (Line)
  const lineY = infoY + 5
  doc.setDrawColor(blueColor) // Light blue separator
  doc.setLineWidth(0.5)
  doc.line(margin, lineY, pageWidth - margin, lineY)

  // 4. Recipient info and Date
  const recipientY = lineY + 15

  // Company Name (Blue, Large)
  doc.setTextColor(blueColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(companyInfo.companyName, margin, recipientY)

  // Date (Right aligned)
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const dateWidth = doc.getTextWidth(currentDate)
  doc.text(currentDate, pageWidth - margin - dateWidth, recipientY)

  // Company Location (Black, Small)
  if (companyInfo.companyLocation) {
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text(companyInfo.companyLocation, margin, recipientY + 6)
  }

  // 5. Salutation
  const startY = recipientY + 25
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.text(`Dear Hiring Team,`, margin, startY)

  // 6. Body Text
  const contentY = startY + 10
  const maxWidth = pageWidth - (margin * 2)
  const lineHeight = 5.5

  doc.setFontSize(10)
  const lines = doc.splitTextToSize(content, maxWidth)
  let currentY = contentY

  lines.forEach((line: string) => {
    if (currentY > pageHeight - 30) {
      doc.addPage()
      currentY = margin
    }
    doc.text(line, margin, currentY)
    currentY += lineHeight
  })

  // 7. Footer / Sign-off
  currentY += 10
  if (currentY > pageHeight - 30) {
    doc.addPage()
    currentY = margin
  }

  doc.text('Kind regards,', margin, currentY)
  currentY += 6
  doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, margin, currentY)
}

function generateStandardLayout(doc: jsPDF, template: any, personalInfo: any, companyInfo: any, content: string) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20

  // Header bar with template color
  doc.setFillColor(template.colors.primary)
  doc.rect(0, 0, pageWidth, 35, 'F')

  // Name in header
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, margin, 23)

  // Contact info bar
  doc.setFillColor(245, 245, 245)
  doc.rect(0, 35, pageWidth, 25, 'F')

  doc.setTextColor(80, 80, 80)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  const contactInfo = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location
  ].filter(Boolean).join('  |  ')

  doc.text(contactInfo, margin, 48)

  const socialInfo = [
    personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`,
    personalInfo.github && `GitHub: ${personalInfo.github}`,
    personalInfo.portfolio && `Portfolio: ${personalInfo.portfolio}`
  ].filter(Boolean).join('  |  ')

  if (socialInfo) {
    doc.text(socialInfo, margin, 55)
  }

  // Date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.text(currentDate, margin, 75)

  // Company info
  doc.setTextColor(40, 40, 40)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(companyInfo.companyName, margin, 85)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  if (companyInfo.companyLocation) {
    doc.text(companyInfo.companyLocation, margin, 91)
  }
  if (companyInfo.contactPerson) {
    doc.text(`Attn: ${companyInfo.contactPerson}`, margin, companyInfo.companyLocation ? 97 : 91)
  }

  // Subject line
  const subjectY = 110
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(template.colors.primary)
  doc.text(`Re: Application for ${companyInfo.position}`, margin, subjectY)

  // Cover letter content
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(40, 40, 40)

  const contentY = subjectY + 12
  const maxWidth = pageWidth - (margin * 2)
  const lineHeight = 6

  const lines = doc.splitTextToSize(content, maxWidth)
  let currentY = contentY

  lines.forEach((line: string) => {
    if (currentY > pageHeight - 30) {
      doc.addPage()
      currentY = margin
    }
    doc.text(line, margin, currentY)
    currentY += lineHeight
  })
}
