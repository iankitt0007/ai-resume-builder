"use client";

import dynamic from "next/dynamic";
import type { ResumeContent } from "@resume-builder/shared-types";
import type { TemplateCustomization } from "@resume-builder/shared-types";

const ResumePreview = dynamic(
  () => import("@/components/resume/ResumePreview").then((m) => ({ default: m.ResumePreview })),
  { ssr: false }
);

interface PreviewPanelProps {
  content: ResumeContent;
  customization: TemplateCustomization;
  templateSlug?: string;
  isPdfMode?: boolean;
}

export function PreviewPanel({
  content,
  customization,
  templateSlug = "classic",
  isPdfMode = false,
}: PreviewPanelProps) {
  return (
    <div className="h-full bg-muted/30 rounded-lg overflow-auto p-4">
      <div className="max-w-[21cm] mx-auto bg-white shadow-lg min-h-[29.7cm] p-8">
        <ResumePreview
          data={content}
          customization={customization}
          templateSlug={templateSlug}
          isPdfMode={isPdfMode}
        />
      </div>
    </div>
  );
}
