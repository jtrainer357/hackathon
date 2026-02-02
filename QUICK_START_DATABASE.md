# Database Quick Start - 5 Minutes to Running API

## 1. Create Supabase Project (2 min)

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Name it "mental-health-mvp", choose password, select region
4. Wait for project to provision (~2 min)

## 2. Get Your Credentials (30 sec)

1. Go to Project Settings (gear icon) → API
2. Copy these 3 values:
   - **Project URL**
   - **anon public key**
   - **service_role key**

## 3. Update .env.local (30 sec)

Open `.env.local` and paste your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-key...
```

## 4. Run Migrations (2 min)

In your Supabase dashboard:

1. Go to SQL Editor (left sidebar)
2. Click "New Query"
3. Copy/paste and run each file in order:

### Migration 1: Core Schema
Copy all of `supabase/migrations/20260201_000000_core_schema.sql` → Click **Run**

### Migration 2: Seed Data
Copy all of `supabase/migrations/20260201_000001_seed_data.sql` → Click **Run**

### Migration 3: Tim Anders Data
Copy all of `supabase/migrations/20260201_000002_tim_anders_data.sql` → Click **Run**

## 5. Start Dev Server (30 sec)

```bash
npm run dev
```

## 6. Test API (30 sec)

Open in browser or use curl:

### Search for Tim Anders:
```
http://localhost:3000/api/patients/search?q=Anders
```

### Get Tim's Full Record:
```
http://localhost:3000/api/patients/c0000000-0000-0000-0000-000000000001
```

---

## You're Done! 🎉

You now have:
- ✅ 58 patients in database
- ✅ Tim Anders with 12 SOAP notes, 15 appointments, 14 outcome measures
- ✅ 2 working API endpoints
- ✅ TypeScript types ready to import

## Next Steps

- Import types: `import { PatientDetails } from '@/types/database'`
- Build Patient 360 view using GET `/api/patients/[id]`
- Create search interface using GET `/api/patients/search`

## Need Help?

See `DATABASE_SETUP.md` for detailed instructions and troubleshooting.

---

**Tim Anders Patient ID:** `c0000000-0000-0000-0000-000000000001`

Use this ID to test the patient details endpoint and build your Patient 360 view.
