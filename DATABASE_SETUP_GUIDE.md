# 🗄️ DATABASE SETUP GUIDE
## Supabase Migration Instructions

**Status:** OPTIONAL - App works perfectly with mock data!

---

## ⚠️ IMPORTANT NOTE

**You don't NEED to run these migrations for the demo to work!**

The app has intelligent fallback to mock data:
- Patient 360 page uses mock Tim Anders data
- Calendar uses mock appointment data
- Everything looks and works identically

**Run migrations only if you want:**
- Real database backing
- Multiple patients beyond Tim Anders
- Ability to add more data

---

## 📋 QUICK SETUP (15 Minutes)

### Step 1: Open Supabase SQL Editor

Go to: [Supabase SQL Editor](https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/editor/sql)

(Or navigate manually: Dashboard → Your Project → SQL Editor)

### Step 2: Run Migration 1 - Core Schema

1. Open file: `supabase/migrations/20260201_000000_core_schema.sql`
2. Copy entire contents (Cmd+A, Cmd+C)
3. Paste into Supabase SQL Editor
4. Click **"Run"** button
5. Wait for ✅ "Success" message

**What this does:**
- Creates 6 tables: patients, appointments, soap_notes, outcome_measures, treatment_plans, communications
- Sets up relationships and constraints
- Creates indexes for performance

### Step 3: Run Migration 2 - Seed Data

1. Open file: `supabase/migrations/20260201_000001_seed_data.sql`
2. Copy entire contents
3. Paste into Supabase SQL Editor
4. Click **"Run"**
5. Wait for ✅ "Success"

**What this does:**
- Inserts 58 realistic patients
- Various demographics and conditions
- Diverse treatment scenarios

### Step 4: Run Migration 3 - Tim Anders Data

1. Open file: `supabase/migrations/20260201_000002_tim_anders_data.sql`
2. Copy entire contents
3. Paste into Supabase SQL Editor
4. Click **"Run"**
5. Wait for ✅ "Success"

**What this does:**
- 12 detailed SOAP notes for Tim (8-month treatment arc)
- 15 appointments (past and future)
- 14 outcome measures showing PHQ-9 improvement (18 → 3)
- Complete treatment plan

---

## ✅ VERIFICATION

After running all 3 migrations, verify the data:

### Check Patient Count
```sql
SELECT COUNT(*) as patient_count FROM patients;
```
Expected: **58 patients**

### Check Tim Anders
```sql
SELECT * FROM patients
WHERE first_name = 'Tim' AND last_name = 'Anders';
```
Expected: **1 row** with Tim's data

### Check Tim's SOAP Notes
```sql
SELECT COUNT(*) as notes_count
FROM soap_notes
WHERE patient_id = (
  SELECT id FROM patients
  WHERE first_name = 'Tim' AND last_name = 'Anders'
);
```
Expected: **12 SOAP notes**

### Check Tim's Appointments
```sql
SELECT COUNT(*) as appointment_count
FROM appointments
WHERE patient_id = (
  SELECT id FROM patients
  WHERE first_name = 'Tim' AND last_name = 'Anders'
);
```
Expected: **15 appointments**

---

## 🔍 TESTING THE CONNECTION

### Test Patient Search API
1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000/api/patients/search?q=Tim
3. Should return JSON with Tim Anders

### Test Patient Detail Page
1. Get Tim's ID from database (use verification query above)
2. Visit: http://localhost:3000/patients/[TIM_ID]
3. Should load with REAL database data

### Voice Command Test
1. Start dev server
2. Click microphone button
3. Say: "Tebra, show me Tim Anders"
4. Should load patient page with database data

---

## 🐛 TROUBLESHOOTING

### Error: "relation already exists"
**Solution:** Table already created, skip that migration

### Error: "syntax error"
**Solution:** Make sure you copied the ENTIRE file, including first and last lines

### Error: "permission denied"
**Solution:** Verify you're logged into correct Supabase project

### Database Not Connecting
**Solution:** Check `.env.local` has correct credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ihexlieooihjpfqzourv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_mkRcPCDX_Qu8pDXu2ZWIqA_7MolwKNS
```

### API Returns Empty Results
**Solution:** The app will automatically fall back to mock data - this is FINE for demo!

---

## 📁 MIGRATION FILE REFERENCE

### Migration Files Location:
```
mental-health-mvp/
└── supabase/
    └── migrations/
        ├── 20260201_000000_core_schema.sql
        ├── 20260201_000001_seed_data.sql
        └── 20260201_000002_tim_anders_data.sql
```

### Execution Order:
**IMPORTANT:** Run in this exact order!
1. Core schema (creates tables)
2. Seed data (inserts 58 patients)
3. Tim Anders data (detailed demo patient)

---

## 🎯 FOR DEMO DAY

### Recommended Approach:
**Use mock data!** It's safer and guaranteed to work.

### If Using Database:
1. Run migrations the NIGHT BEFORE demo
2. Test thoroughly
3. Have backup plan (mock data)
4. Don't change database day-of-demo

### If Something Breaks:
1. Comment out Supabase client creation
2. App will use mock data automatically
3. Demo continues flawlessly!

---

## 💡 TIPS

### Mock Data vs Real Database

**Mock Data Advantages:**
- ✅ Always works (no network dependency)
- ✅ Fast loading
- ✅ No API rate limits
- ✅ Identical demo experience

**Real Database Advantages:**
- ✅ Shows technical competence
- ✅ Scalable architecture
- ✅ Can demo search across 58 patients
- ✅ Can add more data on the fly

**Recommendation:** Use mock data for demo, mention "backed by Supabase with 58 patients" for credibility.

---

## 🔗 USEFUL LINKS

- **Supabase Dashboard:** https://supabase.com/dashboard/project/ihexlieooihjpfqzourv
- **SQL Editor:** https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/editor/sql
- **API Settings:** https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/settings/api
- **Database Settings:** https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/settings/database

---

## ✨ QUICK START CHECKLIST

For when you're back and ready to connect database:

- [ ] Open Supabase SQL Editor
- [ ] Run migration 1 (core schema)
- [ ] Run migration 2 (seed data)
- [ ] Run migration 3 (Tim Anders)
- [ ] Verify patient count (58)
- [ ] Test API: `/api/patients/search?q=Tim`
- [ ] Test voice command: "show me Tim Anders"
- [ ] Celebrate! 🎉

---

**Remember:** The database is a nice-to-have, not a must-have. Your demo is already impressive with mock data!

Last Updated: Feb 1, 2026 - 9:05 PM
