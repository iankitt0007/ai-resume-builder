-- 001_initial_schema.sql
-- Initial database schema for Resume Builder SaaS

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  thumbnail_url   TEXT,
  config          JSONB NOT NULL DEFAULT '{}',  -- fonts, colors, layout options
  is_premium      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Resumes table
CREATE TABLE resumes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  template_id     UUID REFERENCES templates(id),
  title           TEXT NOT NULL DEFAULT 'Untitled Resume',
  slug            TEXT,                          -- for shareable links
  is_public       BOOLEAN DEFAULT FALSE,
  customization   JSONB NOT NULL DEFAULT '{}',   -- overrides: colors, fonts, spacing
  content         JSONB NOT NULL DEFAULT '{}',   -- all resume sections
  version         INTEGER DEFAULT 1,
  last_exported   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Resume content JSONB structure:
-- {
--   "personal": { "name", "email", "phone", "location", "linkedin", "website", "summary" },
--   "experience": [{ "id", "company", "role", "start", "end", "current", "description", "bullets": [] }],
--   "education": [{ "id", "institution", "degree", "field", "start", "end", "gpa" }],
--   "skills": [{ "id", "category", "items": [] }],
--   "projects": [{ "id", "name", "description", "url", "tech": [], "bullets": [] }],
--   "certifications": [{ "id", "name", "issuer", "date", "url" }],
--   "languages": [{ "id", "language", "proficiency" }],
--   "custom_sections": [{ "id", "title", "entries": [] }]
-- }

-- Resume versions (audit trail)
CREATE TABLE resume_versions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id   UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  version     INTEGER NOT NULL,
  content     JSONB NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_template_id ON resumes(template_id);
CREATE INDEX idx_resumes_slug ON resumes(slug);
CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
