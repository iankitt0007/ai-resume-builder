/**
 * Template registry - Open/Closed Principle: add new templates without modifying this file.
 * Each template is registered by slug.
 */

import type { ComponentType } from "react";
import type { TemplateProps } from "@resume-builder/shared-types";
import { ClassicTemplate } from "./classic/template";
import { ModernTemplate } from "./modern/template";
import { MinimalTemplate } from "./minimal/template";
import { ExecutiveTemplate } from "./executive/template";
import { CreativeTemplate } from "./creative/template";

export const TEMPLATE_REGISTRY: Record<string, ComponentType<TemplateProps>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
};

export const TEMPLATE_SLUGS = ["classic", "modern", "minimal", "executive", "creative"] as const;
