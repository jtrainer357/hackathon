
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Schema derived from MHMVP_Project_Instructions_v2.md
const TARGET_SCHEMA = {
    "first_name": "Patient's first/given name (required)",
    "last_name": "Patient's last/family name (required)",
    "date_of_birth": "DOB in YYYY-MM-DD format (required)",
    "email": "Email address",
    "phone_mobile": "Mobile/cell phone",
    "phone_home": "Home phone",
    "address_street": "Street address",
    "address_city": "City",
    "address_state": "State (2-letter code)",
    "address_zip": "ZIP code (5 or 9 digit)",
    "insurance_name": "Insurance company name",
    "insurance_member_id": "Insurance member/policy ID",
    "primary_diagnosis_code": "ICD-10 code (e.g., F41.1)",
    "notes": "General notes about patient"
}

export type ColumnMapping = {
    sourceColumn: string
    targetField: string | null
    confidence: number
    transformRequired: boolean
    transformType: 'none' | 'date_format' | 'phone_format' | 'name_split' | 'code_lookup'
}

export async function generateColumnMapping(headers: string[], sampleRows: any[]): Promise<ColumnMapping[]> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `
    You are a data migration assistant for a mental health practice management system.

    Analyze these CSV headers and sample data, then map them to our patient schema.

    HEADERS: ${JSON.stringify(headers)}

    SAMPLE DATA (first 3 rows):
    ${sampleRows.map(row => JSON.stringify(row)).join('\n')}

    TARGET SCHEMA:
    ${JSON.stringify(TARGET_SCHEMA, null, 2)}

    Return a JSON array of mappings:
    [
      {
        "sourceColumn": "original header name",
        "targetField": "schema field name or null if no match",
        "confidence": 0.0-1.0,
        "transformRequired": true/false,
        "transformType": "none" | "date_format" | "phone_format" | "name_split" | "code_lookup"
      }
    ]

    Rules:
    - Map each source column to at most one target field
    - Use confidence < 0.5 for uncertain mappings
    - Set targetField to null for columns that don't match (e.g., "Referral Source")
    - Detect common variations (DOB, Birth Date, Birthday → date_of_birth)
    - Identify columns that need transformation
    - RETURN ONLY JSON. NO MARKDOWN.
  `

    try {
        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        // Clean response of markdown if present
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim()

        return JSON.parse(cleanedJson) as ColumnMapping[]
    } catch (error) {
        console.error("Gemini Column Mapping Error:", error)
        // Fallback: Return empty or heuristic mapping could be implemented here
        return []
    }
}

export async function extractDocumentMetadata(documentText: string, knownPatientNames: string[]) {
    // Placeholder - for PDF analysis step later
    return null
}
