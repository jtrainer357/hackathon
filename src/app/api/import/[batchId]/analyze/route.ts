import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateColumnMapping } from '@/lib/ai/gemini-import'
import { importAnalyzeSchema } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'

// Helper to parse CSV line (simplified)
function parseCSVLine(line: string): string[] {
    return line.split(',').map(s => s.trim().replace(/^"|"$/g, ''))
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ batchId: string }> }
) {
    try {
        // Rate limit AI-heavy endpoint
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        const rateCheck = checkRateLimit(`import-analyze:${ip}`, { maxRequests: 5, windowSeconds: 60 })
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)) } }
            )
        }

        const { batchId } = await params
        const body = await request.json()

        // Validate input
        const parsed = importAnalyzeSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid parameters', details: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const { fileKey } = parsed.data
        const supabase = await createClient()

        // Download file chunk from storage
        const { data, error } = await supabase.storage
            .from('import-temp')
            .download(fileKey)

        if (error || !data) {
            return NextResponse.json(
                { error: 'Failed to download file', details: error?.message },
                { status: 500 }
            )
        }

        // Read first few lines for header and sample
        const text = await data.text()
        const lines = text.split('\n').filter(l => l.trim().length > 0)

        if (lines.length < 1) {
            return NextResponse.json({ error: 'Empty CSV' }, { status: 400 })
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

        // Call Gemini for column mapping
        const mappings = await generateColumnMapping(headers, sampleRows)

        return NextResponse.json({ mappings, headers, sampleRows, batchId })
    } catch (error) {
        console.error('Error in import analyze:', error)
        return NextResponse.json(
            { error: 'Failed to analyze import file' },
            { status: 500 }
        )
    }
}
