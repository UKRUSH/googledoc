export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse-soft rounded-xl bg-border/60 ${className}`}
      aria-hidden="true"
    />
  );
}
