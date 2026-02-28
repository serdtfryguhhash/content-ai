import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const referralData = {
    referral_code: "CAI-ALEX42",
    referral_link: "https://contentai.studio/ref/CAI-ALEX42",
    total_referrals: 12,
    active_referrals: 8,
    monthly_earnings: 39.98,
    total_earned: 247.92,
    commission_rate: 0.25,
    referrals: [
      { name: "Sarah M.", date: "2026-02-15", status: "active", plan: "Creator", earned: 5.0 },
      { name: "James K.", date: "2026-02-10", status: "active", plan: "Agency", earned: 12.5 },
      { name: "Lisa T.", date: "2026-01-28", status: "active", plan: "Creator", earned: 5.0 },
    ],
  };

  return NextResponse.json({ success: true, data: referralData });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { referral_code } = body;

    if (!referral_code) {
      return NextResponse.json({ success: false, error: "Referral code required" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Referral code applied successfully",
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to apply referral" }, { status: 500 });
  }
}
