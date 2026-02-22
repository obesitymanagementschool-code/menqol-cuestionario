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
  access_code text
);

-- RLS: only allow anonymous INSERT (no read/update/delete)
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Index for analysis queries
CREATE INDEX idx_responses_created ON responses (created_at);
CREATE INDEX idx_responses_age ON responses (age);
