import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
