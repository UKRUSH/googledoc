export type Department = "qa" | "agronomy";

export type Block = "A" | "B" | "C" | "D" | "E" | "F";

export interface BlockData {
  qa: string;
  agronomy: string;
}

export interface PlantData {
  name: string;
  blocks: Record<Block, BlockData>;
}

export const BLOCKS: Block[] = ["A", "B", "C", "D", "E", "F"];

export const DEPARTMENTS: Department[] = ["qa", "agronomy"];

export const DEPARTMENT_LABELS: Record<Department, string> = {
  qa: "Quality Assurance Department",
  agronomy: "Agronomy Department",
};

export const DEPARTMENT_SHORT_LABELS: Record<Department, string> = {
  qa: "QA",
  agronomy: "Agronomy",
};
