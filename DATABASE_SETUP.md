# Database Setup Guide - Tebra Mental Health MVP

## Overview

This guide walks you through setting up the Supabase database for the Mental Health MVP hackathon project. The database follows a **Patient-as-Central-Object** architecture with realistic demo data.

---

## Quick Start

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in project details:
   - **Name**: `mental-health-mvp` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for MVP
5. Click "Create new project" and wait for provisioning (~2 minutes)

### 2. Get Your Supabase Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
   - **service_role key** (secret key - keep this safe!)

### 3. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace the placeholder values with your actual credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Services (add these later as needed)
GEMINI_API_KEY=your_gemini_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key
OPENAI_API_KEY=your_openai_api_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Save the file

### 4. Run Database Migrations

In your Supabase project dashboard:

1. Go to **SQL Editor** in the sidebar
2. Click **New Query**
3. Run each migration file in order:

#### Migration 1: Core Schema

Copy the contents of `supabase/migrations/20260201_000000_core_schema.sql` and paste into the SQL editor. Click **Run**.

This creates:
- `practices` table
- `users` table
- `patients` table
- `appointments` table
- `session_notes` table
- `outcome_measures` table
- Indexes for performance
- Helper functions

#### Migration 2: Seed Data

Copy the contents of `supabase/migrations/20260201_000001_seed_data.sql` and paste into the SQL editor. Click **Run**.

This inserts:
- 1 practice: "Serenity Therapy Group"
- 2 users: Dr. Sarah Chen (therapist), Jay Trainer (admin)
- 58 patients including **Tim Anders** (featured demo patient)

#### Migration 3: Tim Anders Detailed Data

Copy the contents of `supabase/migrations/20260201_000002_tim_anders_data.sql` and paste into the SQL editor. Click **Run**.

This inserts for Tim Anders:
- 12 completed appointments
- 3 upcoming appointments (including "Next Thursday 10:00 AM")
- 12 detailed SOAP notes (realistic therapy progression)
- PHQ-9 scores over 6 months: [18, 16, 14, 12, 10, 8, 3] (showing improvement)
- GAD-7 scores over 6 months: [15, 12, 10, 8, 6, 5, 4] (showing improvement)

### 5. Verify Data

In the Supabase dashboard:

1. Go to **Table Editor** in the sidebar
2. Browse through the tables to verify data:
   - `practices` - should have 1 row
   - `users` - should have 2 rows
   - `patients` - should have 58 rows
   - `appointments` - should have 200+ rows
   - `session_notes` - should have 150+ rows
   - `outcome_measures` - should have 100+ rows

3. Run this query in SQL Editor to find Tim Anders:

```sql
SELECT * FROM patients WHERE first_name = 'Tim' AND last_name = 'Anders';
```

You should see Tim's full patient record.

### 6. Test the API Routes

Start your Next.js development server:

```bash
npm run dev
```

Test the API endpoints:

#### Search for Tim Anders:
```bash
curl http://localhost:3000/api/patients/search?q=Anders
```

Should return Tim Anders in the search results.

#### Get Tim's Full Details:

First, get Tim's patient ID from the search results above, then:

```bash
curl http://localhost:3000/api/patients/[TIM_ID]
```

Replace `[TIM_ID]` with Tim's actual UUID. Should return:
- Basic patient info
- 12 session notes
- 15 appointments (12 past + 3 upcoming)
- PHQ-9 and GAD-7 outcome measures
- Next appointment details

---

## Database Schema

### Core Tables

#### `practices`
- Practice/clinic information
- Multi-tenant support (though MVP uses single practice)

#### `users`
- Providers and staff
- Roles: `admin`, `therapist`, `staff`

#### `patients` (Central Object)
- Patient demographics and contact info
- Chief complaint and treatment plan
- Active diagnoses
- Insurance information

#### `appointments`
- Past and upcoming appointments
- Linked to patient and provider
- Status tracking: `scheduled`, `confirmed`, `completed`, `cancelled`, `no-show`

#### `session_notes`
- SOAP format: Subjective, Objective, Assessment, Plan
- CPT codes for billing
- AI metadata support (for future AI-generated notes)
- Status: `draft`, `final`, `signed`, `amended`

#### `outcome_measures`
- Standardized assessment scores
- Types: PHQ-9, GAD-7, PCL-5, AUDIT-C
- Tracked over time for progress monitoring

---

## Demo Patient: Tim Anders

**Profile:**
- **Name**: Tim Anders (he/him)
- **Age**: 34 (born March 15, 1990)
- **Chief Complaint**: "Anxiety and work stress"
- **Diagnoses**: F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety
- **Treatment**: Weekly CBT sessions with Dr. Sarah Chen
- **Duration**: 8 months of treatment (nearly completed)

**Clinical Journey:**
- Started with moderate-severe anxiety (GAD-7: 15) and moderate depression (PHQ-9: 18)
- Progressed through CBT skills training, schema work, and values clarification
- Current scores show significant improvement: GAD-7: 4, PHQ-9: 3 (both minimal)
- Has 3 upcoming appointments scheduled
- 12 detailed SOAP notes documenting realistic therapy progression

**Why Tim?**
Tim is the star of the demo. His data showcases:
- Realistic clinical documentation
- Evidence-based treatment progression
- Measurable outcomes (PHQ-9/GAD-7 tracking)
- Patient-as-Central-Object architecture (all data organized around him)

---

## API Endpoints

### GET `/api/patients/search?q=[name]`

Search patients by first or last name.

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Max results (default: 50)

**Example:**
```
GET /api/patients/search?q=Anders
```

**Response:**
```json
{
  "patients": [
    {
      "id": "uuid",
      "first_name": "Tim",
      "last_name": "Anders",
      "email": "tim.anders@email.com",
      "phone": "(415) 555-1001",
      "age": 34,
      "chief_complaint": "Anxiety and work stress",
      "active_diagnoses": "F41.1 Generalized Anxiety Disorder, F43.22 Adjustment Disorder with Anxiety",
      ...
    }
  ],
  "count": 1,
  "query": "Anders"
}
```

### GET `/api/patients/[id]`

Get full patient details with all related data.

**Example:**
```
GET /api/patients/c0000000-0000-0000-0000-000000000001
```

**Response:**
```json
{
  "id": "uuid",
  "first_name": "Tim",
  "last_name": "Anders",
  "age": 34,
  "stats": {
    "totalNotes": 12,
    "totalAppointments": 15,
    "upcomingAppointments": 3,
    "totalOutcomeMeasures": 14
  },
  "nextAppointment": {
    "appointment_date": "2026-02-07",
    "appointment_time": "10:00:00",
    "type": "Therapy Session",
    ...
  },
  "recentNote": {
    "note_date": "2026-01-25",
    "subjective": "Client reports feeling genuinely good...",
    "objective": "Client appeared peaceful and grounded...",
    "assessment": "Outstanding therapeutic outcome...",
    "plan": "Complete termination as planned...",
    ...
  },
  "sessionNotes": [ /* array of all 12 notes */ ],
  "appointments": {
    "upcoming": [ /* 3 future appointments */ ],
    "past": [ /* 12 completed appointments */ ]
  },
  "outcomeMeasures": {
    "PHQ-9": [ /* 7 measurements showing improvement */ ],
    "GAD-7": [ /* 7 measurements showing improvement */ ]
  }
}
```

---

## TypeScript Types

All database types are defined in `src/types/database.ts`:

- `Practice`
- `User`
- `Patient`
- `Appointment`
- `SessionNote`
- `OutcomeMeasure`
- `PatientDetails` (extended patient with related data)
- `PatientSearchResult`

Import and use them in your components:

```typescript
import { PatientDetails, SessionNote } from '@/types/database';
```

---

## Troubleshooting

### "Relation does not exist" error
- Make sure you ran all migration files in order
- Check the SQL Editor for any error messages

### "Invalid API key" error
- Verify your `.env.local` has the correct credentials
- Make sure you're using the anon key for client-side, service_role for server-side
- Restart your dev server after changing `.env.local`

### No data returned from API
- Check that migrations ran successfully
- Verify data exists in Table Editor
- Check browser console for errors
- Ensure Supabase project is running (check dashboard)

### CORS errors
- Supabase should automatically handle CORS for localhost
- If issues persist, check Project Settings > API > URL Configuration

---

## Next Steps

Once your database is set up:

1. ✅ Verify API routes work with Tim Anders data
2. ✅ Build Patient 360 view using `/api/patients/[id]`
3. ✅ Create patient search using `/api/patients/search`
4. ✅ Display outcome measures charts (PHQ-9/GAD-7)
5. ✅ Show session notes in SOAP format
6. ✅ Display upcoming appointments

---

## Security Notes

⚠️ **FOR MVP/DEMO ONLY** - Row Level Security (RLS) is **disabled** per requirements.

In production, you would:
- Enable RLS on all tables
- Create policies for practice isolation
- Implement proper authentication
- Use service role key only on server-side

For this hackathon MVP, we're using a pre-logged-in demo user with full access.

---

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

## Support

If you run into issues:
1. Check the Supabase dashboard for errors
2. Review browser console and terminal logs
3. Verify all environment variables are set
4. Ensure migrations ran in correct order

Happy coding! 🚀
