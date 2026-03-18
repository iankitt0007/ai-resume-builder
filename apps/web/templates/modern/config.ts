import type { TemplateConfig } from "@resume-builder/shared-types";

export const MODERN_CONFIG: TemplateConfig = {
  slug: "modern",
  name: "Modern",
  description: "Clean, contemporary design with subtle accents",
  primaryColor: "#2563eb",
  secondaryColor: "#64748b",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: 11,
  sectionSpacing: 20,
  showPhoto: true,
  layoutVariant: "single",
  customizableFields: [
    "primaryColor",
    "secondaryColor",
    "fontFamily",
    "fontSize",
    "sectionSpacing",
    "showPhoto",
  ],
};
