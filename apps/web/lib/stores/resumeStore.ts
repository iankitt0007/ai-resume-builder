import { create } from "zustand";

export interface ResumeListItem {
  id: string;
  user_id: string;
  template_id: string | null;
  title: string;
  slug: string | null;
  is_public: boolean;
  content: Record<string, unknown>;
  customization: Record<string, unknown>;
  version: number;
  created_at: string;
  updated_at: string;
}

interface ResumeEditorState {
  localContent: Record<string, unknown>;
  customization: Record<string, unknown>;
  isDirty: boolean;
  isSaving: boolean;
  activeSection: string | null;
  resumeId: string | null;
  title: string;
}

interface ResumeStore extends ResumeEditorState {
  setContent: (content: Record<string, unknown>) => void;
  setCustomization: (custom: Record<string, unknown>) => void;
  updateSection: (section: string, data: unknown) => void;
  setDirty: (dirty: boolean) => void;
  setSaving: (saving: boolean) => void;
  setActiveSection: (section: string | null) => void;
  hydrate: (resume: {
    content: Record<string, unknown>;
    customization: Record<string, unknown>;
    id: string;
    title: string;
  }) => void;
  setTitle: (title: string) => void;
  reset: () => void;
}

const initial: ResumeEditorState = {
  localContent: {},
  customization: {},
  isDirty: false,
  isSaving: false,
  activeSection: null,
  resumeId: null,
  title: "Untitled Resume",
};

export const useResumeStore = create<ResumeStore>((set) => ({
  ...initial,
  setContent: (content) =>
    set({ localContent: content, isDirty: false }),
  setCustomization: (custom) =>
    set((s) => ({ customization: { ...s.customization, ...custom }, isDirty: true })),
  updateSection: (section, data) =>
    set((s) => {
      const next = { ...s.localContent, [section]: data };
      return { localContent: next, isDirty: true };
    }),
  setDirty: (dirty) => set({ isDirty: dirty }),
  setSaving: (saving) => set({ isSaving: saving }),
  setActiveSection: (section) => set({ activeSection: section }),
  hydrate: (resume) =>
    set({
      localContent: resume.content,
      customization: resume.customization,
      resumeId: resume.id,
      title: resume.title,
      isDirty: false,
      isSaving: false,
    }),
  setTitle: (title) => set({ title, isDirty: true }),
  reset: () => set(initial),
}));
