import type { TemplateConfig } from "@resume-builder/shared-types";

export const MINIMAL_CONFIG: TemplateConfig = {
  slug: "minimal",
  name: "Minimal",
  description: "Ultra-clean, distraction-free layout",
  primaryColor: "#0f172a",
  secondaryColor: "#64748b",
  fontFamily: "system-ui, sans-serif",
  fontSize: 10,
  sectionSpacing: 24,
  showPhoto: false,
  layoutVariant: "single",
  customizableFields: ["primaryColor", "fontFamily", "fontSize", "sectionSpacing"],
};
