import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ihexlieooihjpfqzourv.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY || SERVICE_ROLE_KEY === 'your-service-role-key-here') {
  console.error('❌ ERROR: SUPABASE_SERVICE_ROLE_KEY not set in .env.local');
  console.error('\nTo get your service role key:');
  console.error('1. Go to https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/settings/api');
  console.error('2. Copy the "service_role" key (NOT the anon key)');
  console.error('3. Add it to .env.local: SUPABASE_SERVICE_ROLE_KEY=<your-key>');
  console.error('4. Run this script again');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration(filename) {
  const filepath = path.join(__dirname, 'supabase', 'migrations', filename);
  const sql = fs.readFileSync(filepath, 'utf8');

  console.log(`\n📝 Running migration: ${filename}...`);

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try direct approach using REST API
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({ query: sql })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`✅ ${filename} completed successfully`);
    } else {
      console.log(`✅ ${filename} completed successfully`);
    }
  } catch (error) {
    console.error(`❌ Error running ${filename}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting database migrations...\n');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);

  const migrations = [
    '20260201_000000_core_schema.sql',
    '20260201_000001_seed_data.sql',
    '20260201_000002_tim_anders_data.sql'
  ];

  for (const migration of migrations) {
    await runMigration(migration);
  }

  console.log('\n✅ All migrations completed successfully!');
  console.log('\n🔍 Verifying data...');

  // Verify patients
  const { data: patients, error: patientsError } = await supabase
    .from('patients')
    .select('id, first_name, last_name')
    .limit(5);

  if (patientsError) {
    console.error('❌ Error fetching patients:', patientsError);
  } else {
    console.log(`✅ Found ${patients.length} patients (showing first 5)`);
    patients.forEach(p => console.log(`   - ${p.first_name} ${p.last_name}`));
  }

  // Verify Tim Anders
  const { data: tim, error: timError } = await supabase
    .from('patients')
    .select('id, first_name, last_name')
    .eq('first_name', 'Tim')
    .eq('last_name', 'Anders')
    .single();

  if (timError) {
    console.error('❌ Error fetching Tim Anders:', timError);
  } else {
    console.log(`\n✅ Tim Anders found! ID: ${tim.id}`);

    // Count his SOAP notes
    const { count, error: notesError } = await supabase
      .from('soap_notes')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', tim.id);

    if (notesError) {
      console.error('❌ Error counting SOAP notes:', notesError);
    } else {
      console.log(`✅ Tim has ${count} SOAP notes`);
    }
  }

  console.log('\n🎉 Database setup complete! You can now test the app.');
}

main().catch(error => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
