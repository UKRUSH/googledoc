import { NextRequest, NextResponse } from "next/server";
import { plants } from "@/data/plants";
import { setSheetLinkOverride } from "@/lib/sheetLinks";
import { BLOCKS, DEPARTMENTS, type Block, type Department } from "@/types/plant";

// Server-side only — never exposed to the client bundle. Override in your
// environment (SHEET_LINK_ADMIN_PASSWORD) before deploying this anywhere real.
const ADMIN_PASSWORD = process.env.SHEET_LINK_ADMIN_PASSWORD ?? "Changeme@123";

function isValidBlock(block: unknown): block is Block {
  return typeof block === "string" && (BLOCKS as string[]).includes(block);
}

function isValidDepartment(department: unknown): department is Department {
  return typeof department === "string" && (DEPARTMENTS as string[]).includes(department);
}

interface RequestBody {
  action?: "verify" | "save";
  plant?: string;
  block?: string;
  department?: string;
  url?: string;
  password?: string;
}

export async function POST(request: NextRequest) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { action, plant, block, department, url, password } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (action === "verify") {
    return NextResponse.json({ ok: true });
  }

  if (action !== "save") {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  if (!plant || !plants[plant]) {
    return NextResponse.json({ error: "Unknown plant." }, { status: 400 });
  }
  if (!isValidBlock(block)) {
    return NextResponse.json({ error: "Unknown block." }, { status: 400 });
  }
  if (!isValidDepartment(department)) {
    return NextResponse.json({ error: "Unknown department." }, { status: 400 });
  }

  setSheetLinkOverride(plant, block, department, (url ?? "").trim());

  return NextResponse.json({ ok: true });
}
