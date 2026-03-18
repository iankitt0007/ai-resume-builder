/** Zod schemas for resume validation. */

import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  summary: z.string().optional(),
  photo_url: z.string().url().optional().or(z.literal("")),
});

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});

export const educationEntrySchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  gpa: z.string().optional(),
});

export const skillCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  items: z.array(z.string()).default([]),
});

export const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
  tech: z.array(z.string()).default([]),
  bullets: z.array(z.string()).default([]),
});

export const certificationEntrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
});

export const languageEntrySchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Language is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
});

export const resumeContentSchema = z.object({
  personal: personalInfoSchema,
  experience: z.array(experienceEntrySchema).default([]),
  education: z.array(educationEntrySchema).default([]),
  skills: z.array(skillCategorySchema).default([]),
  projects: z.array(projectEntrySchema).default([]),
  certifications: z.array(certificationEntrySchema).default([]),
  languages: z.array(languageEntrySchema).default([]),
  custom_sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    entries: z.array(z.record(z.unknown())).default([]),
  })).default([]),
});

export type ResumeContentInput = z.infer<typeof resumeContentSchema>;
