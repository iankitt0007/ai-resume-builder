"use client";

import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { useState } from "react";
import type { ResumeContent } from "@resume-builder/shared-types";
import { DEFAULT_RESUME_CONTENT } from "@resume-builder/shared-types";

export default function TemplatesPage() {
  const [previewData] = useState<ResumeContent>(DEFAULT_RESUME_CONTENT);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>
      <TemplateGallery previewData={previewData} />
    </div>
  );
}
