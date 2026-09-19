import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import BackButton from "@/components/BackButton";
import BlockCard from "@/components/BlockCard";
import ErrorState from "@/components/ErrorState";
import Stepper from "@/components/Stepper";
import { getPlant } from "@/data/plants";
import { BLOCKS } from "@/types/plant";

type Params = { plant: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { plant: plantSlug } = await params;
  const plant = getPlant(plantSlug);
  return { title: plant ? `${plant.name} Plant` : "Plant not found" };
}

export default async function PlantPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { plant: plantSlug } = await params;
  const plant = getPlant(plantSlug);

  if (!plant) {
    return (
      <ErrorState
        title="Plant not found"
        message="This QR code or link does not match a known plant."
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: plant.name }]} />

      <BackButton href="/" label="Back to Plants" />

      <Stepper current={1} />

      <div className="hero-gradient animate-fade-in-up rounded-2xl px-6 py-6 text-white shadow-md shadow-primary/20">
        <p className="text-xs font-medium uppercase tracking-wide text-white/70">
          Plant
        </p>
        <h1 className="text-2xl font-bold tracking-tight">{plant.name} Plant</h1>
        <p className="mt-1 text-sm text-white/85">Select a block to continue</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {BLOCKS.map((block, index) => (
          <div
            key={block}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <BlockCard plantSlug={plantSlug} block={block} />
          </div>
        ))}
      </div>
    </div>
  );
}
