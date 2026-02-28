import { NextRequest, NextResponse } from "next/server";
import { DEMO_TEMPLATES } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const platform = searchParams.get("platform");
  const search = searchParams.get("search");

  let templates = [...DEMO_TEMPLATES];

  if (category && category !== "All") {
    templates = templates.filter((t) => t.category === category);
  }
  if (platform) {
    templates = templates.filter((t) => t.platform === platform);
  }
  if (search) {
    const q = search.toLowerCase();
    templates = templates.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: templates });
}
