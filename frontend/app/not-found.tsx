import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
      <Card
        bordered
        rounded="xl"
        shadow="lg"
        padding="lg"
        className="w-full max-w-2xl text-center"
      >
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <SearchX className="h-12 w-12" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          404 Error
        </p>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Page Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-slate-600">
          The page you are looking for does not exist, may have been moved,
          or the URL is incorrect.
        </p>

        <div className="flex justify-center">
          <Link href="/">
            <Button className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}