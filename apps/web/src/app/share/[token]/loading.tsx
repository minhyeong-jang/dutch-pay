import { Skeleton } from "~/components/ui/skeleton";

export default function ShareLoading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col">
      {/* Header skeleton */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Summary card skeleton */}
        <Skeleton className="h-36 w-full rounded-xl" />

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>

        {/* Name chips skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>

        {/* Settlement cards skeleton */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
