-- 002_rls_policies.sql
-- Row Level Security policies for Resume Builder

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Resumes: own + public read
CREATE POLICY "resumes_select_own" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "resumes_select_public" ON resumes FOR SELECT USING (is_public = TRUE);
CREATE POLICY "resumes_insert_own" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "resumes_update_own" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "resumes_delete_own" ON resumes FOR DELETE USING (auth.uid() = user_id);

-- Versions: tied to resume ownership
CREATE POLICY "versions_select_own" ON resume_versions FOR SELECT
  USING (resume_id IN (SELECT id FROM resumes WHERE user_id = auth.uid()));
CREATE POLICY "versions_insert_own" ON resume_versions FOR INSERT
  WITH CHECK (resume_id IN (SELECT id FROM resumes WHERE user_id = auth.uid()));

-- Templates: public read only
CREATE POLICY "templates_select_all" ON templates FOR SELECT USING (TRUE);
