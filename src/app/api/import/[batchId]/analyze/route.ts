
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateColumnMapping } from '@/lib/ai/gemini-import'

// Helper to parse CSV line (simplified)
function parseCSVLine(line: string): string[] {
    // This is a naive splitter. Production should use a library like 'csv-parse'
    // But for Hackathon MVP with controlled inputs, this might suffice alongside a note.
    // Or we can install 'csv-parse'.
    // Given restriction on downloading packages without asking, I'll use a regex for now.
    return line.split(',').map(s => s.trim().replace(/^"|"$/g, ''))
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ batchId: string }> }
) {
    const { batchId } = await params
    const { fileKey } = await request.json() // e.g., "batch-uuid/roster/patients.csv"

    if (!fileKey) {
        return NextResponse.json({ error: "No fileKey provided" }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Download file chunk from storage
    const { data, error } = await supabase.storage
        .from('import-temp')
        .download(fileKey)

    if (error || !data) {
        return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
    }

    // 2. Read first few lines for header and sample
    const text = await data.text()
    const lines = text.split('\n').filter(l => l.trim().length > 0)

    if (lines.length < 1) {
        return NextResponse.json({ error: "Empty CSV" }, { status: 400 })
    }

    const headers = parseCSVLine(lines[0])

    // Get up to 3 sample rows
    const sampleRows = lines.slice(1, 4).map(line => {
        const values = parseCSVLine(line)
        const row: Record<string, string | number | null> = {}
        headers.forEach((h, i) => {
            row[h] = values[i]
        })
        return row
    })

    // 3. Call Gemini
    const mappings = await generateColumnMapping(headers, sampleRows)

    // 4. Save mapping to batch record or return to client?
    // Instructions say "AI Processing - Column Mapping... User reviews".
    // Return to client for the UI to display.
    // We might also save it to DB state if we had a comprehensive state table.
    // For MVP, client state in Wizard is fine, then posted on 'commit' or 'validate'.

    return NextResponse.json({ mappings, headers, sampleRows })
}
