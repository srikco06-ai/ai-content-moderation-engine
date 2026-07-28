import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  Shield,
  Sparkles,
} from "lucide-react";

export default function DocumentationPage() {
  const features = [
    "Real-time AI content moderation",
    "Explainable AI predictions",
    "Risk score calculation",
    "Content category detection",
    "Modern Next.js frontend",
    "FastAPI REST backend",
    "Responsive enterprise UI",
    "Persistent moderation history",
  ];

  const techStack = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "REST API",
    "Explainable AI",
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4 text-white">
              <BookOpen className="h-8 w-8" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Documentation
              </p>

              <h1 className="mt-2 text-4xl font-black text-slate-900">
                AI Content Moderation Engine
              </h1>
            </div>

          </div>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-600">
            AI Content Moderation Engine is a production-ready full-stack
            application that analyzes user-generated text, detects harmful
            language, predicts moderation labels, calculates confidence and
            risk scores, and explains AI decisions through transparent
            moderation categories.
          </p>

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold">
                Features
              </h2>
            </div>

            <div className="space-y-4">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />

                  <span className="text-slate-700">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <Code2 className="h-7 w-7 text-indigo-600" />
              <h2 className="text-2xl font-bold">
                Technology Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">

              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-xl bg-slate-100 px-4 py-3 text-center font-medium text-slate-700"
                >
                  {tech}
                </div>
              ))}

            </div>

          </section>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <BrainCircuit className="h-7 w-7 text-purple-600" />
            <h2 className="text-2xl font-bold">
              Explainable AI
            </h2>
          </div>

          <p className="leading-8 text-slate-600">
            Instead of returning only a classification label, the platform
            explains every prediction using confidence values, moderation
            categories, and overall risk scores. This makes model behaviour
            transparent and suitable for enterprise moderation workflows.
          </p>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <Database className="h-7 w-7 text-green-600" />
            <h2 className="text-2xl font-bold">
              Backend API
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 font-mono text-sm text-green-400">

            <p>POST /predict</p>
            <p>GET /health</p>
            <p>GET /docs</p>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-8">

          <div className="flex items-center gap-3">

            <Sparkles className="h-7 w-7 text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Production Ready
            </h2>

          </div>

          <p className="mt-4 leading-8 text-slate-700">
            This project demonstrates a production-quality AI moderation
            platform built with modern frontend architecture, FastAPI,
            reusable React components, TypeScript, explainable AI, and
            scalable REST API integration suitable for portfolio,
            recruiter review, and real-world deployment.
          </p>

        </div>

      </div>
    </main>
  );
}