"use client";

import { useCallback, useEffect } from "react";
import { useResumeStore } from "@/lib/stores/resumeStore";
import { api } from "@/lib/api-client";

export function useResume(resumeId: string | null) {
  const { setResume, setLoading, setError, clearResume } = useResumeStore();

  const fetchResume = useCallback(async () => {
    if (!resumeId) {
      clearResume();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getResume(resumeId);
      setResume(data as Parameters<typeof setResume>[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resume");
    } finally {
      setLoading(false);
    }
  }, [resumeId, setResume, setLoading, setError, clearResume]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return { refetch: fetchResume };
}
