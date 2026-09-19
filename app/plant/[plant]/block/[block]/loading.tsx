import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-10 w-24 rounded-full" />
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    </div>
  );
}
