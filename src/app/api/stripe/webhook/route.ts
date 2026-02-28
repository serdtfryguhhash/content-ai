import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // In production: Verify Stripe webhook signature and handle events
    await req.text();
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
