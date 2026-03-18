-- 003_storage_buckets.sql
-- Storage buckets for avatars and resume exports

INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', TRUE),
  ('resume-exports', 'resume-exports', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Avatars: users can upload/update/delete their own
CREATE POLICY "avatars_select_own" ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatars_insert_own" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatars_update_own" ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "avatars_delete_own" ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- Exports: users can upload and read their own exports
CREATE POLICY "exports_select_own" ON storage.objects FOR SELECT
  USING (bucket_id = 'resume-exports' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "exports_insert_own" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resume-exports' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "exports_delete_own" ON storage.objects FOR DELETE
  USING (bucket_id = 'resume-exports' AND auth.uid()::TEXT = (storage.foldername(name))[1]);
