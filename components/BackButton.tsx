import Link from "next/link";

export default function BackButton({
  href,
  label = "Back",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface py-2 pl-2.5 pr-3.5 text-sm font-medium text-text shadow-sm transition-colors hover:border-primary hover:text-primary active:scale-[0.98]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Link>
  );
}
