import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-10 w-24 rounded-full" />
      <div className="rounded-2xl border border-border bg-surface p-6">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="mt-3 h-6 w-56" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
        <Skeleton className="mt-6 h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
