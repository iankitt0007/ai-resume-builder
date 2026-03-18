import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { request: req, redirectTo } = await getRedirectUrl(request);
  return await handleAuth(req, redirectTo);
}

export async function POST(request: Request) {
  const { request: req, redirectTo } = await getRedirectUrl(request);
  return await handleAuth(req, redirectTo);
}

async function getRedirectUrl(request: Request) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") ?? "/dashboard";
  return { request, redirectTo };
}

async function handleAuth(request: Request, redirectTo: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (user && !request.url.includes("/login") && !request.url.includes("/signup")) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return NextResponse.next();
}
