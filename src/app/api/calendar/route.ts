import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: "Calendar entries retrieved. Connect to Supabase for persistence.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, platform, scheduled_date } = body;

    if (!title || !platform || !scheduled_date) {
      return NextResponse.json({ success: false, error: "Title, platform, and date are required" }, { status: 400 });
    }

    const entry = {
      id: `cal-${Date.now()}`,
      ...body,
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: entry });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create calendar entry" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, data: body });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update entry" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    return NextResponse.json({ success: true, message: `Entry ${id} deleted` });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete entry" }, { status: 500 });
  }
}
