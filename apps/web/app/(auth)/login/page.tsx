"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Welcome back
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Sign in to your Resume Builder account
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-slate-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
