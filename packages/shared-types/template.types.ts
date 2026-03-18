/**
 * Shared Template Types - Used by both Next.js and FastAPI
 */

import type { ResumeContent, TemplateCustomization } from './resume.types';

export interface TemplateConfig {
  slug: string;
  name: string;
  description: string;
  thumbnail_url?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: number;
  sectionSpacing: number;
  showPhoto: boolean;
  layoutVariant: string;
  customizableFields: Array<
    | 'primaryColor'
    | 'secondaryColor'
    | 'fontFamily'
    | 'fontSize'
    | 'sectionSpacing'
    | 'showPhoto'
    | 'layoutVariant'
  >;
}

export interface TemplateProps {
  data: ResumeContent;
  customization: TemplateCustomization;
  isPdfMode?: boolean;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  config: TemplateConfig;
  is_premium: boolean;
  created_at: string;
}
