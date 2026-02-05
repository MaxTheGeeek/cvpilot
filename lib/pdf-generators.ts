import { jsPDF } from 'jspdf'

// Helper to clean URLs for display
const cleanUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')

// --- Layout Generators ---

// 1. Standard Header Layout (Blue, Green, Golden, Yellow)
// Used for: blue-header, green-header, golden-header, yellow-header
export function generateHeaderLayout(doc: jsPDF, template: any, personalInfo: any, companyInfo: any, content: string) {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20

    // Header Background
    doc.setFillColor(template.colors.primary)
    doc.rect(0, 0, pageWidth, 50, 'F') // Increased height for 2-line contact info

    // Name (White, Bold, Large)
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(26)
    doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase(), margin, 20)

    // Personal Info (White, Smaller)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)

    // Line 1: Basic Contact
    const basicContacts = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location
    ].filter(Boolean)

    if (basicContacts.length > 0) {
        doc.text(basicContacts.join('  |  '), margin, 30)
    }

    // Line 2: Social / Portfolio
    const socialContacts = [
        personalInfo.linkedin ? cleanUrl(personalInfo.linkedin) : null,
        personalInfo.github ? cleanUrl(personalInfo.github) : null,
        personalInfo.portfolio ? cleanUrl(personalInfo.portfolio) : null
    ].filter(Boolean) as string[]

    if (socialContacts.length > 0) {
        doc.text(socialContacts.join('  |  '), margin, 38)
    }

    // Content Start
    let currentY = 65

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(currentDate, margin, currentY)

    // Recipient
    currentY += 10
    doc.setFont('helvetica', 'bold')
    doc.text(companyInfo.companyName, margin, currentY)

    if (companyInfo.companyLocation) {
        currentY += 5
        doc.setFont('helvetica', 'normal')
        doc.text(companyInfo.companyLocation, margin, currentY)
    }

    // Subject
    currentY += 15
    doc.setFont('helvetica', 'bold')
    doc.text(`Re: ${companyInfo.position}`, margin, currentY)

    // Salutation
    currentY += 10
    doc.setFont('helvetica', 'normal')
    doc.text(`Dear Hiring Manager,`, margin, currentY)

    // Body
    currentY += 10
    const maxWidth = pageWidth - (margin * 2)
    const lines = doc.splitTextToSize(content, maxWidth)

    lines.forEach((line: string) => {
        if (currentY > pageHeight - 30) {
            doc.addPage()
            currentY = margin
        }
        doc.text(line, margin, currentY)
        currentY += 6
    })

    // Sign off
    currentY += 10
    if (currentY > pageHeight - 30) doc.addPage(), currentY = margin
    doc.text('Sincerely,', margin, currentY)
    currentY += 8
    doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, margin, currentY)
}


// 2. Sidebar Layout
// Used for: green-line (and potentially others)
export function generateSidebarLayout(doc: jsPDF, template: any, personalInfo: any, companyInfo: any, content: string) {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const sidebarWidth = 65 // Slightly wider to accommodate links
    const margin = 15

    // Sidebar Background
    doc.setFillColor(248, 250, 252) // Very light gray/slate
    doc.rect(0, 0, sidebarWidth, pageHeight, 'F')

    // Decorative Line
    doc.setDrawColor(template.colors.primary)
    doc.setLineWidth(2)
    doc.line(sidebarWidth, 0, sidebarWidth, pageHeight)

    // --- Sidebar Content ---
    let sideY = 30

    // Name
    doc.setTextColor(template.colors.primary)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20) // Slightly smaller to fix breaks
    const nameParts = [personalInfo.firstName, personalInfo.lastName]
    nameParts.forEach(part => {
        doc.text(part.toUpperCase(), margin, sideY)
        sideY += 10
    })

    // Contact Info
    sideY += 10
    doc.setTextColor(50, 50, 50)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text("CONTACT", margin, sideY)

    sideY += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)

    const contacts = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin ? cleanUrl(personalInfo.linkedin) : null,
        personalInfo.github ? cleanUrl(personalInfo.github) : null,
        personalInfo.portfolio ? cleanUrl(personalInfo.portfolio) : null
    ].filter(Boolean) as string[]

    contacts.forEach(item => {
        // Basic wrapping for long sidebar text
        const lines = doc.splitTextToSize(item, sidebarWidth - (margin * 2))
        doc.text(lines, margin, sideY)
        sideY += (lines.length * 5) + 3
    })

    // Skills Section (if available)
    if (personalInfo.skills) {
        sideY += 5
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text("SKILLS", margin, sideY)

        sideY += 6
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)

        const skillLines = doc.splitTextToSize(personalInfo.skills, sidebarWidth - (margin * 2))
        doc.text(skillLines, margin, sideY)
    }

    // --- Main Content ---
    const mainMargin = sidebarWidth + 20
    const mainWidth = pageWidth - mainMargin - 15
    let mainY = 30

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(currentDate, mainMargin, mainY)

    // Recipient
    mainY += 15
    doc.setFont('helvetica', 'bold')
    doc.text(companyInfo.companyName, mainMargin, mainY)

    // Subject
    mainY += 15
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(template.colors.primary)
    doc.text(`Position: ${companyInfo.position}`, mainMargin, mainY)

    // Body
    mainY += 15
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    doc.text("Dear Hiring Team,", mainMargin, mainY)
    mainY += 10

    const lines = doc.splitTextToSize(content, mainWidth)
    lines.forEach((line: string) => {
        if (mainY > pageHeight - 30) {
            doc.addPage()
            // Redraw sidebar on new page
            doc.setFillColor(248, 250, 252)
            doc.rect(0, 0, sidebarWidth, pageHeight, 'F')
            doc.setDrawColor(template.colors.primary)
            doc.line(sidebarWidth, 0, sidebarWidth, pageHeight)
            mainY = 30
        }
        doc.text(line, mainMargin, mainY)
        mainY += 6
    })

    // Sign off
    mainY += 10
    doc.text('Best regards,', mainMargin, mainY)
    mainY += 10
    doc.setFont('helvetica', 'bold')
    doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, mainMargin, mainY)
}

// 3. Simple/Minimal Layout (Minimalist Blue, Simple White, Green Title)
// Used for: minimalist-blue, simple-white, green-title
export function generateMinimalLayout(doc: jsPDF, template: any, personalInfo: any, companyInfo: any, content: string) {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20

    // Set Color
    const primaryColor = template.colors.primary

    // 1. Name
    doc.setTextColor(primaryColor)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    const name = `${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase()
    doc.text(name, margin, 25)

    // 2. Personal Info (Stacked columns or flowed)
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')

    let infoY = 35

    // Left Column: Basic
    const leftColX = margin
    const rightColX = margin + 80 // Second column starts at 100mm approx

    // Basic Info
    const basicInfo = [
        personalInfo.location,
        personalInfo.email,
        personalInfo.phone
    ].filter(Boolean)

    let currentInfoY = infoY
    basicInfo.forEach(item => {
        doc.text(item, leftColX, currentInfoY)
        currentInfoY += 5
    })

    // Social Info (Right Column)
    currentInfoY = infoY
    const socialInfo = [
        personalInfo.linkedin ? cleanUrl(personalInfo.linkedin) : null,
        personalInfo.github ? cleanUrl(personalInfo.github) : null,
        personalInfo.portfolio ? cleanUrl(personalInfo.portfolio) : null
    ].filter(Boolean) as string[]

    socialInfo.forEach(item => {
        doc.text(item, rightColX, currentInfoY)
        currentInfoY += 5
    })

    // Adjust y to be below the lowest column
    const maxY = Math.max(infoY + (basicInfo.length * 5), infoY + (socialInfo.length * 5))

    // 3. Separator
    const lineY = maxY + 5
    doc.setDrawColor(primaryColor)
    doc.setLineWidth(0.5)
    doc.line(margin, lineY, pageWidth - margin, lineY)

    // 4. Content
    const startY = lineY + 15
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    doc.text(currentDate, margin, startY)

    // Body logic same as others...
    let currentY = startY + 20

    doc.text(`Dear Hiring Team,`, margin, currentY)
    currentY += 10

    const lines = doc.splitTextToSize(content, pageWidth - (margin * 2))
    lines.forEach((line: string) => {
        if (currentY > pageHeight - 30) {
            doc.addPage()
            currentY = margin
        }
        doc.text(line, margin, currentY)
        currentY += 6
    })

    // Sign off
    currentY += 10
    if (currentY > pageHeight - 30) doc.addPage(), currentY = margin
    doc.text('Sincerely,', margin, currentY)
    currentY += 6
    doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, margin, currentY)
}
