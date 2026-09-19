export default function GoogleSheetButton({ sheetUrl }: { sheetUrl: string }) {
  if (!sheetUrl) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background p-4 text-center">
        <p className="font-medium text-warning">No Google Sheet configured</p>
        <p className="mt-1 text-sm text-muted">Please contact administrator.</p>
      </div>
    );
  }

  return (
    <a
      href={sheetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-white transition-colors hover:bg-primary-hover"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Open Google Sheet
    </a>
  );
}
