"use client";

import { Skeleton } from "@/components/ui/skeleton";


type Props = {
  view: "grid" | "list";
};

export function ProductCardSkeleton({ view }: Props) {
  if (view === "list") {
    return (
      <div className="flex gap-4 rounded-xl border border-stone-100 bg-white p-4">
        {/* Image */}
        <Skeleton className="w-36 h-36 rounded-lg" />

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-3">
          <div>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>

          <Skeleton className="h-3 w-full" />

          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white">
      {/* image */}
      <Skeleton className="aspect-[3/4] w-full" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}