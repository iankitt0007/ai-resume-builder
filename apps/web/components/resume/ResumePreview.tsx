"use client";

import dynamic from "next/dynamic";
import type { ResumeContent, TemplateCustomization } from "@resume-builder/shared-types";

const TEMPLATE_REGISTRY: Record<string, React.ComponentType<{
  data: ResumeContent;
  customization: TemplateCustomization;
  isPdfMode?: boolean;
}>> = {};

// Lazy load templates
const ClassicTemplate = dynamic(
  () => import("@/templates/classic/template").then((m) => m.ClassicTemplate),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);
const ModernTemplate = dynamic(
  () => import("@/templates/modern/template").then((m) => m.ModernTemplate),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);
const MinimalTemplate = dynamic(
  () => import("@/templates/minimal/template").then((m) => m.MinimalTemplate),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);
const ExecutiveTemplate = dynamic(
  () => import("@/templates/executive/template").then((m) => m.ExecutiveTemplate),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);
const CreativeTemplate = dynamic(
  () => import("@/templates/creative/template").then((m) => m.CreativeTemplate),
  { ssr: false, loading: () => <TemplateSkeleton /> }
);

// Register templates (Open/Closed Principle - no switch statements)
const REGISTRY: Record<string, React.ComponentType<{
  data: ResumeContent;
  customization: TemplateCustomization;
  isPdfMode?: boolean;
}>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
};

function TemplateSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border bg-muted/50 p-8">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="mt-4 h-4 w-full rounded bg-muted" />
      <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
    </div>
  );
}

export interface ResumePreviewProps {
  data: ResumeContent;
  customization: TemplateCustomization;
  templateSlug?: string;
  isPdfMode?: boolean;
}

export function ResumePreview({
  data,
  customization,
  templateSlug = "classic",
  isPdfMode = false,
}: ResumePreviewProps) {
  const Template = REGISTRY[templateSlug] ?? ClassicTemplate;
  return (
    <Template
      data={data}
      customization={customization}
      isPdfMode={isPdfMode}
    />
  );
}
