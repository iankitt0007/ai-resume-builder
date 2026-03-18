-- supabase/seed.sql
-- Seed default templates for Resume Builder

INSERT INTO templates (id, slug, name, description, config, is_premium) VALUES
  (
    uuid_generate_v4(),
    'classic',
    'Classic',
    'Professional and traditional resume layout. Ideal for corporate roles.',
    '{"primaryColor": "#1a1a2e", "secondaryColor": "#16213e", "fontFamily": "Georgia", "fontSize": 11, "sectionSpacing": 16, "showPhoto": true, "layoutVariant": "single"}',
    FALSE
  ),
  (
    uuid_generate_v4(),
    'modern',
    'Modern',
    'Clean, contemporary design with subtle accents. Perfect for tech and creative industries.',
    '{"primaryColor": "#0f766e", "secondaryColor": "#14b8a6", "fontFamily": "Inter", "fontSize": 11, "sectionSpacing": 20, "showPhoto": true, "layoutVariant": "two-column"}',
    FALSE
  ),
  (
    uuid_generate_v4(),
    'minimal',
    'Minimal',
    'Stripped-down aesthetic with maximum readability. Great for ATS optimization.',
    '{"primaryColor": "#171717", "secondaryColor": "#525252", "fontFamily": "System UI", "fontSize": 10, "sectionSpacing": 14, "showPhoto": false, "layoutVariant": "single"}',
    FALSE
  ),
  (
    uuid_generate_v4(),
    'executive',
    'Executive',
    'Bold layout for senior professionals. Emphasizes leadership and impact.',
    '{"primaryColor": "#1e3a5f", "secondaryColor": "#0ea5e9", "fontFamily": "Times New Roman", "fontSize": 12, "sectionSpacing": 18, "showPhoto": true, "layoutVariant": "single"}',
    TRUE
  ),
  (
    uuid_generate_v4(),
    'creative',
    'Creative',
    'Design-forward template with unique typography. Best for design and creative roles.',
    '{"primaryColor": "#7c3aed", "secondaryColor": "#a78bfa", "fontFamily": "Poppins", "fontSize": 11, "sectionSpacing": 22, "showPhoto": true, "layoutVariant": "creative"}',
    TRUE
  )
ON CONFLICT DO NOTHING;
