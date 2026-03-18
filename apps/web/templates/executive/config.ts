import type { TemplateConfig } from "@resume-builder/shared-types";

export const EXECUTIVE_CONFIG: TemplateConfig = {
  slug: "executive",
  name: "Executive",
  description: "Bold, authoritative layout for senior roles",
  primaryColor: "#0c4a6e",
  secondaryColor: "#334155",
  fontFamily: "Georgia, serif",
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
