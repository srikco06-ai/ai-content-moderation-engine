"use client";

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface TechnologyItem {
  label: string;
}

const technologies: TechnologyItem[] = [
  { label: "FastAPI" },
  { label: "Next.js 16" },
  { label: "React 19" },
  { label: "TypeScript" },
  { label: "Explainable AI" },
];

const features: FeatureItem[] = [
  {
    title: "Real-Time Analysis",
    description:
      "Analyze user-generated content instantly using a scalable FastAPI inference service.",
    icon: Zap,
  },
  {
    title: "Explainable AI",
    description:
      "Risk scores, moderation categories, and confidence metrics provide transparent predictions.",
    icon: BrainCircuit,
  },
  {
    title: "Production Architecture",
    description:
      "Reusable React components, TypeScript, and clean architecture designed for enterprise deployment.",
    icon: Shield,
  },
];

const highlights = [
  "AI-powered moderation",
  "Risk scoring",
  "Category detection",
  "Explainable predictions",
];

interface HeroProps {
  onAnalyzeClick?: () => void;
  onDocumentationClick?: () => void;
}

export default function Hero({
  onAnalyzeClick,
  onDocumentationClick,
}: HeroProps) {
  return (
    <Card
      rounded="2xl"
      shadow="lg"
      padding="lg"
      className="
        relative
        overflow-hidden
        border
        border-slate-200
        bg-linear-to-br
        from-white
        via-slate-50
        to-blue-50
      "
    >
      {/* Decorative Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-blue-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-24
            h-64
            w-64
            rounded-full
            bg-cyan-200/20
            blur-3xl
          "
        />
      </div>

      <div className="relative z-10">

        {/* Top Badge */}

        <Badge
          variant="info"
          className="mb-6 inline-flex"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Enterprise AI Moderation Platform
        </Badge>

        {/* Main Grid */}

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* LEFT SIDE */}

          <div>

            <div className="mb-6 flex items-center gap-4">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-600
                  text-white
                  shadow-lg
                "
              >
                <Shield className="h-8 w-8" />
              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                  Production Dashboard
                </p>

                <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                  AI Content
                  <br />
                  Moderation Engine
                </h1>

              </div>

            </div>

            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Detect harmful, abusive, hateful, and unsafe content using a
              transformer-based ToxicBERT moderation engine with explainable AI
              predictions. Built with FastAPI, Next.js 16, React 19, and
              TypeScript for scalable, real-time content analysis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              {technologies.map((tech) => (
                <Badge
                  key={tech.label}
                  variant="default"
                >
                  {tech.label}
                </Badge>
              ))}

            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button
                size="lg"
                variant="primary"
                onClick={onAnalyzeClick}
              >
                Analyze Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={onDocumentationClick}
              >
                Documentation
              </Button>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative">

            <Card
              bordered
              shadow="lg"
              rounded="2xl"
              padding="lg"
              className="bg-white/90 backdrop-blur"
            >

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Platform Overview
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Intelligent Moderation
                  </h2>

                </div>

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-100
                  "
                >
                  <Cpu className="h-7 w-7 text-blue-600" />
                </div>

              </div>

              <div className="space-y-5">

                {features.map((feature) => {

                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="
                        flex
                        items-start
                        gap-4
                        rounded-xl
                        border
                        border-slate-200
                        p-4
                        transition-all
                        hover:border-blue-300
                        hover:shadow-sm
                      "
                    >
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-100
                        "
                      >
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {feature.description}
                        </p>
                      </div>

                    </div>

                  );
                })}

              </div>

              <div className="my-8 border-t border-slate-200" />

              <div className="grid grid-cols-3 gap-4">

                <div className="rounded-xl bg-slate-50 p-4 text-center">

                  <Activity className="mx-auto h-6 w-6 text-blue-600" />

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                   FastAPI
                  </p>

                  <p className="text-xs text-slate-500">
                    REST Framework
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-center">

                  <Shield className="mx-auto h-6 w-6 text-green-600" />

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    Modular
                  </p>

                  <p className="text-xs text-slate-500">
                    Clean Architecture
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-center">

                  <BrainCircuit className="mx-auto h-6 w-6 text-purple-600" />

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    AI
                  </p>

                  <p className="text-xs text-slate-500">
                    Explainable Models
                  </p>

                </div>

              </div>

            </Card>

          </div>

        </div>

        {/* Bottom Information */}

        <div
          className="
            mt-12
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/70
            p-6
          "
        >

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-lg font-bold text-slate-900">
                Designed for Production AI Moderation Workflows
              </h3>

              <p className="mt-2 max-w-3xl text-slate-600">
                This platform demonstrates a production-grade AI content
                moderation solution featuring explainable predictions,
                risk scoring, reusable frontend architecture, secure
                FastAPI REST API integration, and real-time content
                analysis.
              </p>

            </div>

            <Badge
              variant="success"
              className="self-start lg:self-center"
            >
              Production Ready
            </Badge>

          </div>

        </div>

      </div>

    </Card>
  );
}