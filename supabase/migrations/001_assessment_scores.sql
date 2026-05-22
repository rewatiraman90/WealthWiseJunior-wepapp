-- Assessment scores table
-- Run this in Supabase Studio → SQL Editor before deploying the assessment scoring feature.

CREATE TABLE IF NOT EXISTS assessment_scores (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id        TEXT        NOT NULL,
  grade           INT         NOT NULL,
  module          INT         NOT NULL,
  score           INT         NOT NULL,          -- number of correct answers (0–3)
  total_questions INT         NOT NULL DEFAULT 3,
  passed          BOOLEAN     NOT NULL,
  answers_submitted JSONB     NOT NULL,          -- array of selected option indices
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_scores_user_id  ON assessment_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_scores_class_id ON assessment_scores(class_id);

ALTER TABLE assessment_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own scores"
  ON assessment_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own scores"
  ON assessment_scores FOR SELECT
  USING (auth.uid() = user_id);
