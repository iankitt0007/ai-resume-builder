"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createResume } from "@/lib/api-client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function NewResumePage() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function create() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }
      setCreating(true);
      try {
        const resume = await createResume(session.access_token, {
          title: "Untitled Resume",
          content: {},
          customization: {},
        });
        router.replace(`/resumes/${resume.id}/edit`);
      } catch {
        setCreating(false);
      }
    }
    create();
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      {creating ? (
        <p className="text-muted-foreground">Creating your resume...</p>
      ) : (
        <Button disabled>Creating...</Button>
      )}
    </div>
  );
}
