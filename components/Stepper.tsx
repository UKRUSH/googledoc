const STEPS = ["Plant", "Block", "Department", "Sheet"];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex w-full items-center">
      {STEPS.map((step, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        const isLast = index === STEPS.length - 1;

        return (
          <li key={step} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isDone
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-secondary text-white"
                      : "bg-surface text-muted border border-border"
                }`}
              >
                {isDone ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={`hidden text-[11px] font-medium sm:block ${
                  isCurrent ? "text-text" : "text-muted"
                }`}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <span
                className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                  isDone ? "bg-primary" : "bg-border"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
