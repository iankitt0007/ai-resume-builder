"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listResumes, type ResumeListItem } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ResumesPage() {
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setLoading(false);
        return;
      }
      try {
        const items = await listResumes(session.access_token);
        setResumes(items);
      } catch {
        setResumes([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 animate-pulse bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
        <Button asChild>
          <Link href="/resumes/new">Create Resume</Link>
        </Button>
      </div>
      {resumes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No resumes yet.</p>
          <Button asChild>
            <Link href="/resumes/new">Create your first resume</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((r) => (
            <Link key={r.id} href={`/resumes/${r.id}/edit`}>
              <Card className="overflow-hidden transition hover:ring-2 hover:ring-primary">
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-3">
                  <p className="font-medium truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated {new Date(r.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
