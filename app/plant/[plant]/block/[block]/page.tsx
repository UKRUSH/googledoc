import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import BackButton from "@/components/BackButton";
import DepartmentCard from "@/components/DepartmentCard";
import ErrorState from "@/components/ErrorState";
import Stepper from "@/components/Stepper";
import { getPlant } from "@/data/plants";
import { BLOCKS, DEPARTMENTS, Block } from "@/types/plant";

type Params = { plant: string; block: string };

function isValidBlock(block: string): block is Block {
  return (BLOCKS as string[]).includes(block);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { plant: plantSlug, block } = await params;
  const plant = getPlant(plantSlug);
  return { title: plant ? `${plant.name} - Block ${block}` : "Not found" };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { plant: plantSlug, block } = await params;
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

  const blockIndex = BLOCKS.indexOf(block);
  const prevBlock = blockIndex > 0 ? BLOCKS[blockIndex - 1] : null;
  const nextBlock = blockIndex < BLOCKS.length - 1 ? BLOCKS[blockIndex + 1] : null;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: plant.name, href: `/plant/${plantSlug}` },
          { label: `Block ${block}` },
        ]}
      />

      <div className="flex items-center justify-between gap-2">
        <BackButton href={`/plant/${plantSlug}`} label={plant.name} />

        <div className="flex items-center gap-1.5">
          {prevBlock ? (
            <Link
              href={`/plant/${plantSlug}/block/${prevBlock}`}
              aria-label={`Go to Block ${prevBlock}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text shadow-sm transition-colors hover:border-primary hover:text-primary active:scale-[0.96]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 text-border" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          {nextBlock ? (
            <Link
              href={`/plant/${plantSlug}/block/${nextBlock}`}
              aria-label={`Go to Block ${nextBlock}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text shadow-sm transition-colors hover:border-primary hover:text-primary active:scale-[0.96]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 text-border" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </div>
      </div>

      <Stepper current={2} />

      <div className="hero-gradient animate-fade-in-up flex items-center gap-4 rounded-2xl px-6 py-6 text-white shadow-md shadow-primary/20">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl font-bold backdrop-blur">
          {block}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/70">
            {plant.name} Plant
          </p>
          <h1 className="text-xl font-bold tracking-tight">Block {block}</h1>
          <p className="mt-0.5 text-sm text-white/85">Select a department</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {DEPARTMENTS.map((department, index) => (
          <div
            key={department}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <DepartmentCard plantSlug={plantSlug} block={block} department={department} />
          </div>
        ))}
      </div>
    </div>
  );
}
