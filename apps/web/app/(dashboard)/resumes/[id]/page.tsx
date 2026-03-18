"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { createBrowserClient } from "@/lib/supabase/client";
import type { ResumeData } from "@resume-builder/shared-types";
import { FileText, Pencil, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ResumeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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
        setResume(r as ResumeData);
      } catch {
        toast.error("Failed to load resume");
        router.push("/resumes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Delete this resume?")) return;
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;
    setDeleting(true);
    try {
      await apiClient.deleteResume(id, session.access_token);
      toast.success("Resume deleted");
      router.push("/resumes");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!resume) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <FileText className="h-10 w-10 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">{resume.title}</h1>
            <p className="text-sm text-muted-foreground">
              Updated {new Date(resume.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild>
            <Link href={`/resumes/${id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/resumes/${id}/preview`}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
