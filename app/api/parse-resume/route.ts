import { NextResponse } from 'next/server';
// @ts-ignore
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF text
    const pdfData = await pdfParse(buffer);
    const textContent = pdfData.text;

    if (!textContent || textContent.trim().length === 0) {
      return NextResponse.json({ error: 'Could not extract text from the PDF' }, { status: 400 });
    }

    // Return the raw text to the client so Puter.js can parse it
    return NextResponse.json({ text: textContent });
  } catch (error: any) {
    console.error('Error parsing resume PDF:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse resume.' }, { status: 500 });
  }
}
