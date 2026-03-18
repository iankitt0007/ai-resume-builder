import type { TemplateConfig } from "@resume-builder/shared-types";

export const CLASSIC_CONFIG: TemplateConfig = {
  slug: "classic",
  name: "Classic",
  description: "Traditional, professional layout with clear hierarchy",
  primaryColor: "#1e3a5f",
  secondaryColor: "#4a5568",
  fontFamily: "Georgia, serif",
  fontSize: 11,
  sectionSpacing: 16,
  showPhoto: false,
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
