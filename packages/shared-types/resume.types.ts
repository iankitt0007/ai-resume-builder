/**
 * Shared Resume Types - Used by both Next.js and FastAPI
 * Aligns with resume content JSONB structure in database
 */

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
  summary?: string;
  photo_url?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end?: string;
  current?: boolean;
  description?: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end?: string;
  gpa?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description?: string;
  url?: string;
  tech: string[];
  bullets: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string;
  entries: Array<Record<string, unknown>>;
}

export interface ResumeContent {
  personal: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  custom_sections: CustomSectionEntry[];
}

export interface TemplateCustomization {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: number;
  sectionSpacing?: number;
  showPhoto?: boolean;
  layoutVariant?: string;
}

export interface ResumeData {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  slug?: string;
  is_public: boolean;
  content: ResumeContent;
  customization: TemplateCustomization;
  version: number;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_RESUME_CONTENT: ResumeContent = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  custom_sections: [],
};
