import Link from "next/link";

export default function BlockCard({
  plantSlug,
  block,
}: {
  plantSlug: string;
  block: string;
}) {
  return (
    <Link
      href={`/plant/${plantSlug}/block/${block}`}
      className="group flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0"
    >
      <span className="text-2xl font-bold text-primary">{block}</span>
      <span className="text-xs font-medium text-muted">Block {block}</span>
    </Link>
  );
}
