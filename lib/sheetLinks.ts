import fs from "node:fs";
import path from "node:path";
import { plants } from "@/data/plants";
import type { Block, Department } from "@/types/plant";

// Overrides are saved to a JSON file in the project (data/sheet-links.json),
// so a saved link is a real file change to the codebase, not just browser
// storage. NOTE: on serverless hosts (Netlify, Vercel, etc.) the deployed
// filesystem is read-only / ephemeral at request time — writes there will
// not persist across invocations or redeploys. This is reliable when
// running `npm run dev` / a persistent Node server on disk you control.
const OVERRIDES_PATH = path.join(process.cwd(), "data", "sheet-links.json");

export type SheetLinkOverrides = Record<string, string>;

export function sheetLinkKey(plant: string, block: Block, department: Department) {
  return `${plant}:${block}:${department}`;
}

export function readOverrides(): SheetLinkOverrides {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw) as SheetLinkOverrides;
  } catch {
    return {};
  }
}

function writeOverrides(overrides: SheetLinkOverrides) {
  fs.mkdirSync(path.dirname(OVERRIDES_PATH), { recursive: true });
  fs.writeFileSync(OVERRIDES_PATH, `${JSON.stringify(overrides, null, 2)}\n`, "utf-8");
}

export function getResolvedSheetUrl(
  plantSlug: string,
  block: Block,
  department: Department
): string {
  const overrides = readOverrides();
  const key = sheetLinkKey(plantSlug, block, department);
  if (overrides[key]) return overrides[key];

  const plant = plants[plantSlug];
  return plant ? plant.blocks[block][department] : "";
}

export function setSheetLinkOverride(
  plantSlug: string,
  block: Block,
  department: Department,
  url: string
) {
  const overrides = readOverrides();
  const key = sheetLinkKey(plantSlug, block, department);

  if (url) {
    overrides[key] = url;
  } else {
    delete overrides[key];
  }

  writeOverrides(overrides);
}
