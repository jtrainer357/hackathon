# MCP Setup Guide - Mental Health MVP

## Configuration Status

✅ **Active MCPs:**
1. Filesystem - ✅ Active (project directory access)
2. Context7 - ✅ Active (codebase intelligence)
3. PostgreSQL - ✅ Active (Supabase database access)
4. GitHub - ✅ Active (repo management)
5. Memory - ✅ Active (cross-session context)
6. Sequential Thinking - ✅ Active (complex planning)

⚠️ **Disabled:**
7. Supabase MCP - Disabled (PostgreSQL MCP provides same functionality)

---

## Required Credentials Setup

### 1. Supabase MCP

**Location in config:** `supabase.env`

**Required values:**
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

**How to get:**
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy "Project URL" → Use as `SUPABASE_URL`
4. Copy "service_role" key (NOT anon key) → Use as `SUPABASE_SERVICE_ROLE_KEY`

**Update command:**
```bash
# Edit the config file and replace placeholder values
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

---

### 2. GitHub MCP

**Location in config:** `github.env`

**Required value:**
```bash
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

**How to get:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ `repo` (full control of private repositories)
   - ✅ `read:org` (read org and team membership)
   - ✅ `workflow` (if you want to manage Actions)
4. Generate and copy the token

---

### 3. PostgreSQL MCP

**Location in config:** `postgres.args[2]`

**Required value:**
```bash
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

**How to get:**
1. Go to Supabase project dashboard
2. Settings → Database
3. Copy "Connection string" (URI format)
4. Replace `[YOUR-PASSWORD]` with your database password

**Alternative:** You can use the same Supabase connection, but this MCP gives you direct SQL access vs. the Supabase MCP which uses the API.

---

## After Setting Credentials

1. **Restart Claude Desktop** - MCPs only load on startup
2. **Verify connection:**
   - Ask: "What MCPs are connected?"
   - Test Supabase: "Show me my Supabase tables"
   - Test GitHub: "What's the status of my hackathon repo?"

---

## MCP Capabilities Quick Reference

### Supabase MCP
- Query database tables directly
- Test RLS policies
- Manage auth users
- Monitor real-time subscriptions
- **Use for:** Direct database operations, schema inspection

### GitHub MCP
- Read/create issues and PRs
- View repo status and branches
- Manage labels and milestones
- **Use for:** Tracking hackathon progress, creating documentation issues

### PostgreSQL MCP
- Execute raw SQL queries
- Analyze query performance
- Inspect schema and indexes
- **Use for:** Complex queries, performance optimization

### Memory MCP
- Persist context across sessions
- Remember design decisions
- Store patient data structure patterns
- **Use for:** Maintaining project context when Jay is at work

### Sequential Thinking MCP
- Break down complex features
- Architectural planning
- Multi-step reasoning
- **Use for:** Planning Care page workflow, session recording architecture

### Filesystem MCP (Updated)
- Now has access to project directory
- Bulk file operations
- Directory traversal
- **Use for:** Large-scale refactoring, file organization

---

## Troubleshooting

**MCP not showing up after restart?**
- Check JSON syntax: `cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq`
- Check logs: `~/Library/Logs/Claude/mcp*.log`

**Supabase connection failing?**
- Verify you're using `service_role` key, not `anon` key
- Check URL format includes `https://`

**PostgreSQL timeout?**
- Whitelist your IP in Supabase dashboard (Settings → Database → Connection pooling)

---

## Next Steps

1. Set up Supabase credentials (CRITICAL for this project)
2. Set up GitHub token (recommended for hackathon tracking)
3. PostgreSQL can use same connection as Supabase
4. Restart Claude Desktop
5. Test with: "Show me my Supabase database schema"
