"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { useResumeStore } from "@/lib/stores/resumeStore";
import { apiClient } from "@/lib/api-client";
import { createBrowserClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function ResumeEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { setResume, hydrate } = useResumeStore();

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      try {
        const r = await apiClient.getResume(id, session.access_token);
        hydrate(r as Parameters<typeof setResume>[0]);
      } catch {
        toast.error("Failed to load resume");
        router.push("/resumes");
      }
    }
    load();
  }, [id, router, hydrate]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <ResumeEditor resumeId={id} />
    </div>
  );
}
