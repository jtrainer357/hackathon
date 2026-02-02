# 🚀 SUPABASE SETUP GUIDE (15 Minutes)
## Mental Health MVP - Quick Start

---

## Step 1: Create Supabase Project (5 min)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub (or email)
4. Click "New Project"
5. Fill in:
   - **Name:** `mental-health-mvp` (or your choice)
   - **Database Password:** (save this somewhere safe)
   - **Region:** Choose closest to you
6. Click "Create new project"
7. **Wait 2-3 minutes** for project to provision

---

## Step 2: Get Your Credentials (2 min)

1. Once project is ready, click "Settings" (gear icon) in sidebar
2. Click "API" under Project Settings
3. You'll see:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJxxx...` (long string)

**Copy both of these!**

---

## Step 3: Update .env.local (1 min)

1. Open `/mental-health-mvp/.env.local`
2. Replace the placeholder values:

```bash
# Replace these two lines:
NEXT_PUBLIC_SUPABASE_URL=https://your-xxxxx-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
```

3. Save the file
4. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## Step 4: Run Database Migrations (5 min)

1. In Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New query"
3. Run migrations **in this exact order:**

### Migration 1: Core Schema

1. Open `/supabase/migrations/20260201_000000_core_schema.sql`
2. Copy ALL the contents
3. Paste into SQL Editor
4. Click "Run" (or press Ctrl/Cmd+Enter)
5. Should see: "Success. No rows returned"

### Migration 2: Seed Data

1. Open `/supabase/migrations/20260201_000001_seed_data.sql`
2. Copy ALL the contents
3. Paste into NEW query in SQL Editor
4. Click "Run"
5. Should see: "Success. No rows returned"

### Migration 3: Tim Anders Data

1. Open `/supabase/migrations/20260201_000002_tim_anders_data.sql`
2. Copy ALL the contents
3. Paste into NEW query in SQL Editor
4. Click "Run"
5. Should see: "Success. No rows returned"

---

## Step 5: Verify Data (2 min)

### Check Patients Table

1. In Supabase, click "Table Editor" in left sidebar
2. Click "patients" table
3. You should see **58 rows**
4. Find "Tim Anders" (should be first row)

### Check Appointments

1. Click "appointments" table
2. Should see **200+ rows**

### Check Session Notes

1. Click "session_notes" table
2. Should see **150+ rows**

**If you see all this data: ✅ SUCCESS!**

---

## Step 6: Test the API (2 min)

### Test Patient Search

1. Open browser: http://localhost:3000/api/patients/search?q=Anders
2. Should see JSON with Tim Anders data

### Test Patient Details

1. Get Tim's ID from the search result (should be `c0000000-0000-0000-0000-000000000001`)
2. Open: http://localhost:3000/api/patients/c0000000-0000-0000-0000-000000000001
3. Should see full patient object with notes, appointments, etc.

**If both work: ✅ DATABASE CONNECTED!**

---

## Step 7: Test Voice Demo (1 min)

1. Open http://localhost:3000
2. Click microphone button (top right)
3. Allow microphone permission
4. Say: **"Tebra, show me Tim Anders"**
5. Should navigate to patient page
6. Should show REAL data from database (not mock)

**If this works: 🎉 DEMO READY!**

---

## 🚨 Troubleshooting

### "API Error" in Browser Console

**Problem:** Wrong credentials in .env.local

**Fix:**
1. Double-check Project URL and anon key
2. Make sure no extra spaces
3. Restart dev server after changing .env.local

### "No rows returned" but Data Doesn't Appear

**Problem:** Migrations didn't run successfully

**Fix:**
1. In SQL Editor, run: `SELECT * FROM patients;`
2. If empty, re-run migrations in order
3. Make sure to run ALL three migrations

### Voice Not Working

**Problem:** Browser doesn't support Web Speech API

**Fix:**
1. Use Chrome or Edge (best support)
2. Make sure you're on `localhost` (not 127.0.0.1)
3. Allow microphone permission

### Patient Page Shows Mock Data

**Problem:** API call failing

**Fix:**
1. Check browser console for errors
2. Verify API route returns data: http://localhost:3000/api/patients/search?q=Anders
3. Check .env.local has correct credentials

---

## 📋 Quick Verification Checklist

After setup, verify these all work:

- [ ] Supabase project created
- [ ] .env.local updated with credentials
- [ ] All 3 migrations ran successfully
- [ ] Can see 58 patients in Supabase Table Editor
- [ ] API search endpoint returns Tim Anders: `/api/patients/search?q=Anders`
- [ ] API details endpoint returns full data: `/api/patients/[tim-id]`
- [ ] Voice command navigates to patient page
- [ ] Patient page shows real data (outcome chart, SOAP notes)

**All checked? You're ready to build the calendar! 🚀**

---

## 💡 Pro Tips

1. **Keep Supabase Dashboard Open:** You'll want to check data during demo
2. **Test Voice 5x:** Make sure it works consistently
3. **Browser:** Always use Chrome for demo (best Web Speech API support)
4. **Backup Plan:** If API fails during demo, mock data still works!

---

## 🎯 What This Enables

Once Supabase is connected:
- ✅ Real patient search (not just Tim Anders)
- ✅ Multiple patients in database (58 total)
- ✅ Real data in dashboard widgets
- ✅ Ability to add more patients via import
- ✅ Full demo credibility (show real database)

---

**Need Help?**

If anything breaks, check:
1. Browser console for errors
2. Supabase logs (in dashboard)
3. Make sure dev server restarted after .env.local changes

---

**You got this! 15 minutes to full database power! 💪**

Last Updated: Feb 1, 2026
