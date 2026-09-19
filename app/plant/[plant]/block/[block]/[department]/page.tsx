import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import BackButton from "@/components/BackButton";
import GoogleSheetButton from "@/components/GoogleSheetButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import ErrorState from "@/components/ErrorState";
import Stepper from "@/components/Stepper";
import { getPlant } from "@/data/plants";
import {
  BLOCKS,
  DEPARTMENTS,
  Block,
  Department,
  DEPARTMENT_LABELS,
  DEPARTMENT_SHORT_LABELS,
} from "@/types/plant";

type Params = { plant: string; block: string; department: string };

function isValidBlock(block: string): block is Block {
  return (BLOCKS as string[]).includes(block);
}

function isValidDepartment(department: string): department is Department {
  return (DEPARTMENTS as string[]).includes(department);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { plant: plantSlug, block, department } = await params;
  const plant = getPlant(plantSlug);
  if (!plant || !isValidBlock(block) || !isValidDepartment(department)) {
    return { title: "Not found" };
  }
  return {
    title: `${plant.name} - Block ${block} - ${DEPARTMENT_SHORT_LABELS[department]}`,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { plant: plantSlug, block, department } = await params;
  const plant = getPlant(plantSlug);

  if (!plant) {
    return (
      <ErrorState
        title="Plant not found"
        message="This QR code or link does not match a known plant."
      />
    );
  }

  if (!isValidBlock(block)) {
    return (
      <ErrorState
        title="Block not found"
        message={`${plant.name} does not have a block named "${block}".`}
      />
    );
  }

  if (!isValidDepartment(department)) {
    return (
      <ErrorState
        title="Department not found"
        message="This department does not exist for this block."
      />
    );
  }

  const sheetUrl = plant.blocks[block][department];
  const accent = department === "qa" ? "bg-qa" : "bg-agronomy";
  const accentSoft = department === "qa" ? "bg-qa-soft text-qa" : "bg-agronomy-soft text-agronomy";
  const otherDepartment: Department = department === "qa" ? "agronomy" : "qa";

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: plant.name, href: `/plant/${plantSlug}` },
          { label: `Block ${block}`, href: `/plant/${plantSlug}/block/${block}` },
          { label: DEPARTMENT_SHORT_LABELS[department] },
        ]}
      />

      <div className="flex items-center justify-between gap-2">
        <BackButton href={`/plant/${plantSlug}/block/${block}`} label={`Block ${block}`} />

        <Link
          href={`/plant/${plantSlug}/block/${block}/${otherDepartment}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-2 pl-3.5 pr-2.5 text-sm font-medium text-text shadow-sm transition-colors hover:border-primary hover:text-primary active:scale-[0.98]"
        >
          Switch to {DEPARTMENT_SHORT_LABELS[otherDepartment]}
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <Stepper current={3} />

      <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className={`h-1.5 w-full ${accent}`} aria-hidden="true" />
        <div className="p-6">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${accentSoft}`}
          >
            {DEPARTMENT_SHORT_LABELS[department]}
          </span>

          <h1 className="mt-3 text-xl font-bold text-text">
            {DEPARTMENT_LABELS[department]}
          </h1>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-background p-3">
              <dt className="text-xs text-muted">Plant</dt>
              <dd className="font-medium text-text">{plant.name}</dd>
            </div>
            <div className="rounded-xl bg-background p-3">
              <dt className="text-xs text-muted">Block</dt>
              <dd className="font-medium text-text">{block}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <GoogleSheetButton sheetUrl={sheetUrl} />
            </div>
            {sheetUrl && <CopyLinkButton url={sheetUrl} />}
          </div>
        </div>
      </div>
    </div>
  );
}
