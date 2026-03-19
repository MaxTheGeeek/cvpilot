import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const fileCount = parseInt(formData.get('fileCount') as string) || 0
    const userId = formData.get('userId') as string | null

    if (fileCount < 2) {
      return NextResponse.json(
        { error: 'At least 2 PDF files are required' },
        { status: 400 }
      )
    }

    // Collect all PDF files
    const pdfBuffers: ArrayBuffer[] = []
    const fileNames: string[] = []
    
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file${i}`) as File | null
      if (file) {
        const buffer = await file.arrayBuffer()
        pdfBuffers.push(buffer)
        fileNames.push(file.name)
      }
    }

    if (pdfBuffers.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 valid PDF files are required' },
        { status: 400 }
      )
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create()

    // Copy pages from each PDF
    for (const buffer of pdfBuffers) {
      const pdf = await PDFDocument.load(buffer)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(page => mergedPdf.addPage(page))
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save()
    
    // Convert to base64 data URI
    const base64 = Buffer.from(mergedPdfBytes).toString('base64')
    const dataUri = `data:application/pdf;base64,${base64}`

    return NextResponse.json({ 
      success: true, 
      downloadUrl: dataUri 
    })
  } catch (error) {
    console.error('Error merging PDFs:', error)
    return NextResponse.json(
      { error: 'Failed to merge PDFs' },
      { status: 500 }
    )
  }
}
