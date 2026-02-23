-- ============================================
-- MENQOL Questionnaire - Supabase table setup
-- Run this in Supabase SQL Editor (one time)
-- ============================================

-- Table for storing questionnaire responses
CREATE TABLE responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  age integer,
  weight numeric,
  answers jsonb NOT NULL,
  -- Computed MENQOL domain means (scale 1-8)
  score_vasomotor numeric(4,2),
  score_psychosocial numeric(4,2),
  score_physical numeric(4,2),
  score_sexual numeric(4,2),
  score_global numeric(4,2),
  -- For controlled studies
  access_code text,
  -- GDPR consent fields
  consent_given boolean DEFAULT false,
  consent_date timestamptz,
  deletion_code text
);

-- RLS: only allow anonymous INSERT (no read/update/delete)
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users (researchers) get full access
CREATE POLICY "Allow authenticated full access" ON responses
  FOR ALL
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX idx_responses_created ON responses (created_at);
CREATE INDEX idx_responses_age ON responses (age);
CREATE INDEX idx_responses_deletion_code ON responses (deletion_code);

-- ============================================
-- Audit log table (SOC 2 — Logging)
-- ============================================
CREATE TABLE audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  user_email text NOT NULL,
  action text NOT NULL,
  details jsonb
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth insert audit" ON audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Auth read audit" ON audit_log
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Migration script (run if table already exists)
-- ============================================
-- ALTER TABLE responses ADD COLUMN IF NOT EXISTS consent_given boolean DEFAULT false;
-- ALTER TABLE responses ADD COLUMN IF NOT EXISTS consent_date timestamptz;
-- ALTER TABLE responses ADD COLUMN IF NOT EXISTS deletion_code text;
-- CREATE INDEX IF NOT EXISTS idx_responses_deletion_code ON responses (deletion_code);
--
-- CREATE POLICY "Allow authenticated full access" ON responses
--   FOR ALL TO authenticated USING (true);
