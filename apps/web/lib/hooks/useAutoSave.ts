import { useCallback, useEffect, useRef } from "react";
import { useResumeStore } from "../stores/resumeStore";

const DEBOUNCE_MS = 2000;

export function useAutoSave(
  onSave: (content: Record<string, unknown>, customization: Record<string, unknown>) => Promise<void>
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { localContent, customization, isDirty, setDirty, setSaving } = useResumeStore();

  const save = useCallback(async () => {
    setSaving(true);
    try {
      await onSave(localContent, customization);
      setDirty(false);
    } catch {
      // Error handled by caller (toast)
    } finally {
      setSaving(false);
    }
  }, [localContent, customization, onSave, setDirty, setSaving]);

  useEffect(() => {
    if (!isDirty) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      save();
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDirty, localContent, customization, save]);

  return { save };
}
