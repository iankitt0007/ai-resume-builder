import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-800">ResumeBuilder</span>
          <nav className="flex gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Build resumes that get you hired
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            AI-powered templates, real-time preview, and ATS optimization.
            Create professional resumes in minutes.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
          >
            Get started free
          </Link>
        </div>
      </main>
    </div>
  );
}
