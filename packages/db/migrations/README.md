# Database Migrations

## Overview

This directory contains SQL migrations for the Supabase PostgreSQL database.

## Migrations

| File | Description |
|------|-------------|
| `0001_rls_and_ttl.sql` | Enable RLS on all tables, create access policies, set up anonymous data TTL cleanup |

## How to Apply

### Option A: Supabase SQL Editor (Recommended for first-time setup)

1. Open the [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to **SQL Editor**
4. Copy the contents of the migration file and paste it into the editor
5. Click **Run**

### Option B: Supabase CLI

```bash
# From the project root
supabase db push
```

Or run a specific migration file directly:

```bash
supabase db execute --file packages/db/migrations/0001_rls_and_ttl.sql
```

### Option C: psql

```bash
psql "$DATABASE_URL" -f packages/db/migrations/0001_rls_and_ttl.sql
```

## Notes

- **RLS (Row Level Security)**: All five tables (`templates`, `participants`, `payments`, `payment_participants`, `shared_links`) have RLS enabled. Policies ensure users can only access data belonging to their own templates via `auth.uid()`.
- **shared_links public access**: The `shared_links` table has an additional SELECT policy for the `anon` role, allowing unauthenticated users to resolve share tokens on the public share page.
- **Anonymous Data TTL**: A `pg_cron` job runs daily at 03:00 UTC to delete templates (and all cascaded child rows) belonging to anonymous users (`auth.users.is_anonymous = true`) whose data is older than 15 days.
- **Idempotency**: The migration uses `CREATE OR REPLACE` for the cleanup function and safely unschedules existing cron jobs before re-scheduling, so it can be run multiple times without errors.
