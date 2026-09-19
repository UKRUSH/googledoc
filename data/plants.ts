import { BLOCKS, PlantData } from "@/types/plant";

// Replace the empty strings below with real Google Sheet URLs
// (https://docs.google.com/spreadsheets/...) once they are created.
// An empty value renders the "No Google Sheet configured" empty state.
function emptyBlocks() {
  return Object.fromEntries(
    BLOCKS.map((block) => [block, { qa: "", agronomy: "" }])
  ) as PlantData["blocks"];
}

export const plants: Record<string, PlantData> = {
  thunkama: {
    name: "Thunkama",
    blocks: emptyBlocks(),
  },
  kanamediara: {
    name: "Kanamediara",
    blocks: emptyBlocks(),
  },
  wedipitiya: {
    name: "Wedipitiya",
    blocks: emptyBlocks(),
  },
  hingura: {
    name: "Hingura",
    blocks: emptyBlocks(),
  },
  thalava: {
    name: "Thalava",
    blocks: emptyBlocks(),
  },
};

export function getPlant(slug: string) {
  return plants[slug];
}
