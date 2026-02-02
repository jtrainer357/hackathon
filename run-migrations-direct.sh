#!/bin/bash

# Database Migration Script for Supabase
# This script executes SQL migrations using curl and the Supabase REST API

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SUPABASE_URL="https://ihexlieooihjpfqzourv.supabase.co"
MIGRATIONS_DIR="/Users/jaytrainer/Documents/Tebra/Mental Health MVP Hackathon/mental-health-mvp/supabase/migrations"

echo -e "${YELLOW}🚀 Starting database migrations...${NC}\n"

# Check if SERVICE_ROLE_KEY is set
if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ] || [ "$SUPABASE_SERVICE_ROLE_KEY" = "your-service-role-key-here" ]; then
    echo -e "${RED}❌ ERROR: SUPABASE_SERVICE_ROLE_KEY not set${NC}"
    echo ""
    echo "To get your service role key:"
    echo "1. Go to: https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/settings/api"
    echo "2. Copy the 'service_role' key (NOT the anon key)"
    echo "3. Run: export SUPABASE_SERVICE_ROLE_KEY='your-key-here'"
    echo "4. Run this script again"
    echo ""
    echo "Or add it to .env.local and run: source .env.local"
    exit 1
fi

# Function to execute SQL via PostgreSQL REST API
execute_sql() {
    local filename=$1
    local filepath="$MIGRATIONS_DIR/$filename"

    echo -e "${YELLOW}📝 Running migration: $filename...${NC}"

    if [ ! -f "$filepath" ]; then
        echo -e "${RED}❌ File not found: $filepath${NC}"
        return 1
    fi

    # Read SQL file
    SQL_CONTENT=$(cat "$filepath")

    # Execute via Supabase PostgREST (this won't work for DDL, need different approach)
    # Instead, we'll use psql if available, or provide manual instructions

    echo -e "${GREEN}✅ Prepared: $filename${NC}"
    echo "   File location: $filepath"
}

# Execute migrations in order
migrations=(
    "20260201_000000_core_schema.sql"
    "20260201_000001_seed_data.sql"
    "20260201_000002_tim_anders_data.sql"
)

echo -e "${YELLOW}📋 Migrations to run:${NC}"
for migration in "${migrations[@]}"; do
    echo "   - $migration"
done
echo ""

# Check if psql is available
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✅ PostgreSQL client (psql) found!${NC}"
    echo ""
    echo -e "${YELLOW}To run migrations, you need the database password.${NC}"
    echo "Get it from: https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/settings/database"
    echo ""
    echo "Then run these commands:"
    echo ""
    for migration in "${migrations[@]}"; do
        echo "psql 'postgresql://postgres.ihexlieooihjpfqzourv:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres' -f '$MIGRATIONS_DIR/$migration'"
    done
else
    echo -e "${YELLOW}⚠️  psql not found. Manual migration required.${NC}"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to: https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/editor/sql"
    echo "2. Copy and paste each file in order:"
    for migration in "${migrations[@]}"; do
        echo "   - $MIGRATIONS_DIR/$migration"
    done
    echo "3. Click 'Run' after pasting each file"
fi

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}ALTERNATIVE: Use Supabase Dashboard (Recommended!)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo "1. Open: https://supabase.com/dashboard/project/ihexlieooihjpfqzourv/editor/sql"
echo ""
echo "2. Run Migration 1 (Core Schema):"
echo "   File: $MIGRATIONS_DIR/20260201_000000_core_schema.sql"
echo "   Copy entire contents → Paste in SQL Editor → Click Run"
echo ""
echo "3. Run Migration 2 (Seed Data):"
echo "   File: $MIGRATIONS_DIR/20260201_000001_seed_data.sql"
echo "   Copy entire contents → Paste in SQL Editor → Click Run"
echo ""
echo "4. Run Migration 3 (Tim Anders):"
echo "   File: $MIGRATIONS_DIR/20260201_000002_tim_anders_data.sql"
echo "   Copy entire contents → Paste in SQL Editor → Click Run"
echo ""
echo -e "${GREEN}After running all 3 migrations, come back and I'll test the connection!${NC}"
