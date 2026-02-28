import { NextRequest, NextResponse } from "next/server";
import { PRICING_TIERS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier } = body;

    const pricingTier = PRICING_TIERS.find((t) => t.tier === tier);
    if (!pricingTier || pricingTier.price === 0) {
      return NextResponse.json({ success: false, error: "Invalid tier" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        url: "/settings?success=true",
        session_id: `cs_demo_${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create checkout session" }, { status: 500 });
  }
}
