import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      data: { url: "/settings" },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create portal session" }, { status: 500 });
  }
}
