import { NextRequest, NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'
import { templates } from '@/lib/templates'
import { generateHeaderLayout, generateSidebarLayout, generateMinimalLayout } from '@/lib/pdf-generators'

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

    // Dispatch to correct generator
    switch (template.id) {
      case 'blue-header':
      case 'green-header':
      case 'golden-header':
      case 'yellow-header':
        generateHeaderLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
        break
      case 'green-line':
      case 'blue-infobox': // Using sidebar layout for info-box styled ones for now
        generateSidebarLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
        break
      case 'simple-white':
      case 'green-title':
      case 'minimalist-blue':
        generateMinimalLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
        break
      case 'black-footer':
        // For now use Header layout but with black/dark primary
        generateHeaderLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
        break
      default:
        generateHeaderLayout(doc, template, personalInfo, companyInfo, coverLetterContent)
    }

    // Generate PDF as base64
    const pdfBase64 = doc.output('datauristring')

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
