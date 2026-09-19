import PlantCard from "@/components/PlantCard";
import { plants } from "@/data/plants";

export default function Home() {
  const plantEntries = Object.entries(plants);

  return (
    <div className="flex flex-1 flex-col gap-8">
      <section className="hero-gradient animate-fade-in-up flex flex-col gap-4 overflow-hidden rounded-3xl px-6 py-8 text-white shadow-lg shadow-primary/20 sm:px-8 sm:py-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M12 22s7-5.2 7-11.5A7 7 0 0 0 5 10.5C5 16.8 12 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Plant Management System
          </h1>
          <p className="max-w-md text-sm text-white/85 sm:text-base">
            Scan a plant QR code, choose a block and department, and jump straight
            into its Google Sheet.
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            5 Plants
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            30 Blocks
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            60 Department Access Points
          </span>
        </div>
      </section>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-text">Select Plant</h2>
        <p className="text-sm text-muted">Tap a plant to view its blocks.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {plantEntries.map(([slug, plant], index) => (
          <div
            key={slug}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <PlantCard slug={slug} name={plant.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
