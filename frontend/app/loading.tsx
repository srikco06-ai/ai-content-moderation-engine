"use client";

import Card from "@/components/ui/Card";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10">
      <section className="space-y-4 text-center">
        <Skeleton className="mx-auto h-12 w-72" />
        <Skeleton className="mx-auto h-5 w-[32rem] max-w-full" />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card
            key={item}
            bordered
            rounded="xl"
            padding="lg"
            shadow="sm"
          >
            <div className="space-y-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          </Card>
        ))}
      </section>

      <Card
        bordered
        rounded="xl"
        padding="lg"
        shadow="sm"
      >
        <div className="space-y-4">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-40 w-full" />
          <div className="flex justify-end">
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </Card>

      <Card
        bordered
        rounded="xl"
        padding="lg"
        shadow="sm"
      >
        <div className="space-y-4">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </div>
      </Card>

      <Card
        bordered
        rounded="xl"
        padding="lg"
        shadow="sm"
      >
        <div className="space-y-4">
          <Skeleton className="h-6 w-44" />

          {[1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="grid grid-cols-6 gap-4"
            >
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}