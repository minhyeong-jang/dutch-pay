-- =============================================================
-- Migration: 0001_rls_and_ttl.sql
-- Description: Enable RLS on all tables, create access policies,
--              and set up anonymous data TTL cleanup via pg_cron.
-- =============================================================

-- ─── 1. Enable RLS ──────────────────────────────────────────

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_links ENABLE ROW LEVEL SECURITY;

-- ─── 2. templates Policies ──────────────────────────────────

CREATE POLICY "templates_select_own"
  ON templates FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "templates_insert_own"
  ON templates FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "templates_update_own"
  ON templates FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "templates_delete_own"
  ON templates FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ─── 3. participants Policies ───────────────────────────────

CREATE POLICY "participants_select_own"
  ON participants FOR SELECT
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "participants_insert_own"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "participants_update_own"
  ON participants FOR UPDATE
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  )
  WITH CHECK (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "participants_delete_own"
  ON participants FOR DELETE
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

-- ─── 4. payments Policies ───────────────────────────────────

CREATE POLICY "payments_select_own"
  ON payments FOR SELECT
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "payments_insert_own"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "payments_update_own"
  ON payments FOR UPDATE
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  )
  WITH CHECK (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

CREATE POLICY "payments_delete_own"
  ON payments FOR DELETE
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

-- ─── 5. payment_participants Policies ───────────────────────

CREATE POLICY "payment_participants_select_own"
  ON payment_participants FOR SELECT
  TO authenticated
  USING (
    payment_id IN (
      SELECT p.id FROM payments p
      WHERE p.template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "payment_participants_insert_own"
  ON payment_participants FOR INSERT
  TO authenticated
  WITH CHECK (
    payment_id IN (
      SELECT p.id FROM payments p
      WHERE p.template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "payment_participants_update_own"
  ON payment_participants FOR UPDATE
  TO authenticated
  USING (
    payment_id IN (
      SELECT p.id FROM payments p
      WHERE p.template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
    )
  )
  WITH CHECK (
    payment_id IN (
      SELECT p.id FROM payments p
      WHERE p.template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "payment_participants_delete_own"
  ON payment_participants FOR DELETE
  TO authenticated
  USING (
    payment_id IN (
      SELECT p.id FROM payments p
      WHERE p.template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
    )
  );

-- ─── 6. shared_links Policies ───────────────────────────────

-- Owners can SELECT their own shared links
CREATE POLICY "shared_links_select_own"
  ON shared_links FOR SELECT
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

-- Public SELECT by token (for resolving share pages via publicProcedure).
-- The anon role is used by unauthenticated requests in Supabase.
CREATE POLICY "shared_links_select_by_token"
  ON shared_links FOR SELECT
  TO anon
  USING (true);

-- Only template owners can create shared links
CREATE POLICY "shared_links_insert_own"
  ON shared_links FOR INSERT
  TO authenticated
  WITH CHECK (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

-- Only template owners can delete shared links
CREATE POLICY "shared_links_delete_own"
  ON shared_links FOR DELETE
  TO authenticated
  USING (
    template_id IN (SELECT id FROM templates WHERE user_id = auth.uid())
  );

-- ─── 7. Anonymous Data TTL ──────────────────────────────────

-- Function: delete templates (and CASCADE children) belonging to
-- anonymous users whose data is older than 15 days.
CREATE OR REPLACE FUNCTION public.cleanup_anonymous_data()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM templates
  WHERE user_id IN (
    SELECT id FROM auth.users WHERE is_anonymous = true
  )
  AND created_at < now() - interval '15 days';
$$;

-- Enable pg_cron extension (idempotent)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily cleanup at 03:00 UTC.
-- Wrap in DO block so re-running the migration is safe (unschedule first).
DO $$
BEGIN
  -- Remove existing job if present
  PERFORM cron.unschedule('cleanup-anonymous-data');
EXCEPTION
  WHEN others THEN NULL; -- ignore if job doesn't exist
END;
$$;

SELECT cron.schedule(
  'cleanup-anonymous-data',    -- job name
  '0 3 * * *',                 -- every day at 03:00 UTC
  'SELECT public.cleanup_anonymous_data()'
);
