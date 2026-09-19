import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center gap-2 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm shadow-primary/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
              <path
                d="M12 22s7-5.2 7-11.5A7 7 0 0 0 5 10.5C5 16.8 12 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="tracking-tight">Plant Management System</span>
        </Link>
      </div>
    </header>
  );
}
