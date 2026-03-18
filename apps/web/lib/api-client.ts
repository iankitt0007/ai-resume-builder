/**
 * API client for Resume Builder backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ResumeListItem {
  id: string;
  title: string;
  template_id: string | null;
  updated_at: string;
  [key: string]: unknown;
}

async function getAuthHeaders(token?: string): Promise<HeadersInit> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    return headers;
  }
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.access_token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${session.access_token}`;
  }
  return headers;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: await getAuthHeaders(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: await getAuthHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPatch<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: await getAuthHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete(path: string, token?: string): Promise<void> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: await getAuthHeaders(token),
  });
  if (!res.ok) throw new Error(await res.text());
}

export const api = {
  async getResume(id: string) {
    return apiGet(`/api/v1/resumes/${id}`);
  },
  async getTemplates() {
    return apiGet<unknown[]>("/api/v1/templates");
  },
};

export const apiClient = {
  async getResume(id: string, token?: string) {
    return apiGet(`/api/v1/resumes/${id}`, token);
  },
  async deleteResume(id: string, token?: string) {
    return apiDelete(`/api/v1/resumes/${id}`, token);
  },
  async exportResume(resumeId: string, format: string) {
    return apiPost<{ url: string }>(
      `/api/v1/resumes/${resumeId}/export`,
      { format },
      undefined
    );
  },
};

export async function createResume(token: string, data: { title?: string; template_id?: string; content?: object; customization?: object }) {
  return apiPost("/api/v1/resumes", data, token);
}

export async function listResumes(token: string): Promise<ResumeListItem[]> {
  return apiGet("/api/v1/resumes", token);
}
