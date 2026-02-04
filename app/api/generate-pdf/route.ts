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

    const lines = doc.splitTextToSize(coverLetterContent, maxWidth)
    let currentY = contentY

    lines.forEach((line: string) => {
      if (currentY > pageHeight - 30) {
        doc.addPage()
        currentY = margin
      }
      doc.text(line, margin, currentY)
      currentY += lineHeight
    })

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
