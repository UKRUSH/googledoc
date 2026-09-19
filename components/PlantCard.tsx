import Link from "next/link";

export default function PlantCard({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      href={`/plant/${slug}`}
      className="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M12 22s7-5.2 7-11.5A7 7 0 0 0 5 10.5C5 16.8 12 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <span className="text-lg font-semibold text-text">{name}</span>
      </div>
      <span className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-white transition-colors group-hover:bg-primary-hover">
        Open Plant
      </span>
    </Link>
  );
}
