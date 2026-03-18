import { create } from "zustand";

export interface TemplateItem {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  config: Record<string, unknown>;
  is_premium: boolean;
  created_at: string;
}

interface TemplateStore {
  selectedTemplateSlug: string;
  setSelectedTemplate: (slug: string) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplateSlug: "classic",
  setSelectedTemplate: (slug) => set({ selectedTemplateSlug: slug }),
}));
