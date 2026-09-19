import Link from "next/link";

export default function ErrorState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="animate-fade-in-up flex flex-1 flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <h1 className="text-xl font-semibold text-text">{title}</h1>
      <p className="max-w-xs text-muted">{message}</p>
      <Link
        href="/"
        className="mt-2 rounded-xl border border-border bg-surface px-5 py-2.5 font-medium text-text transition-colors hover:border-primary hover:text-primary"
      >
        Back to Plant Selection
      </Link>
    </div>
  );
}
