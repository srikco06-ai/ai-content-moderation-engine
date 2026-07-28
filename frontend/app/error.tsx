"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <Card
        bordered
        rounded="xl"
        shadow="lg"
        padding="lg"
        className="w-full max-w-2xl text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-slate-600">
          An unexpected error occurred while rendering this page.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            className="inline-flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="secondary"
              className="inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 rounded-lg bg-slate-100 p-4 text-left">
            <summary className="cursor-pointer font-semibold">
              Error Details
            </summary>

            <pre className="mt-4 overflow-auto whitespace-pre-wrap text-xs text-red-600">
              {error.message}
            </pre>
          </details>
        )}
      </Card>
    </main>
  );
}