import type { TemplateConfig } from "@resume-builder/shared-types";

export const CREATIVE_CONFIG: TemplateConfig = {
  slug: "creative",
  name: "Creative",
  description: "Stand-out design for creative professionals",
  primaryColor: "#7c3aed",
  secondaryColor: "#a78bfa",
  fontFamily: "Georgia, serif",
  fontSize: 11,
  sectionSpacing: 18,
  showPhoto: true,
  layoutVariant: "creative",
  customizableFields: [
    "primaryColor",
    "secondaryColor",
    "fontFamily",
    "fontSize",
    "sectionSpacing",
    "showPhoto",
  ],
};
