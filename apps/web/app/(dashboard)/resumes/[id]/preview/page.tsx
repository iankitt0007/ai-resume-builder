"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ExportButton } from "@/components/resume/ExportButton";
import { apiClient } from "@/lib/api-client";
import { createBrowserClient } from "@/lib/supabase/client";
import type { ResumeContent, TemplateCustomization } from "@resume-builder/shared-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResumePreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [content, setContent] = useState<ResumeContent | null>(null);
  const [customization, setCustomization] = useState<TemplateCustomization>({});
  const [templateSlug, setTemplateSlug] = useState("classic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      try {
        const r = await apiClient.getResume(id, session.access_token);
        const d = r as { content?: ResumeContent; customization?: TemplateCustomization; template_id?: string };
        setContent((d.content as ResumeContent) || { personal: {} as ResumeContent["personal"], experience: [], education: [], skills: [], projects: [], certifications: [], languages: [], custom_sections: [] });
        setCustomization((d.customization as TemplateCustomization) || {});
        setTemplateSlug("classic");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href={`/resumes/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <ExportButton resumeId={id} />
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ minHeight: "842px" }}>
          <ResumePreview
            data={content || { personal: {} as ResumeContent["personal"], experience: [], education: [], skills: [], projects: [], certifications: [], languages: [], custom_sections: [] }}
            customization={customization}
            templateSlug={templateSlug}
            isPdfMode
          />
        </div>
      </div>
    </div>
  );
}
