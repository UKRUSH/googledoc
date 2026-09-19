import Link from "next/link";
import type { ReactNode } from "react";
import { Department, DEPARTMENT_LABELS } from "@/types/plant";

const STYLES: Record<
  Department,
  { border: string; dot: string; soft: string; icon: ReactNode }
> = {
  qa: {
    border: "hover:border-qa",
    dot: "bg-qa",
    soft: "bg-qa-soft text-qa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  agronomy: {
    border: "hover:border-agronomy",
    dot: "bg-agronomy",
    soft: "bg-agronomy-soft text-agronomy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M5 20c8 0 11-5 11-13-8 0-11 5-11 13Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M5 20c0-4 2-7 5-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default function DepartmentCard({
  plantSlug,
  block,
  department,
}: {
  plantSlug: string;
  block: string;
  department: Department;
}) {
  const style = STYLES[department];

  return (
    <Link
      href={`/plant/${plantSlug}/block/${block}/${department}`}
      className={`group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${style.border}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.soft}`}>
          {style.icon}
        </span>
        <div>
          <p className="font-semibold text-text">{DEPARTMENT_LABELS[department]}</p>
          <p className="text-sm text-muted">Open Department</p>
        </div>
      </div>
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
    </Link>
  );
}
