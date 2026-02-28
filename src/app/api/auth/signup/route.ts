import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, full_name } = body;

    if (!email || !password || !full_name) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // In production: Supabase Auth + create user profile
    // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name } } });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: `user-${Date.now()}`,
          email,
          full_name,
          subscription_tier: "free",
          referral_code: `CAI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        },
        message: "Account created successfully. Please verify your email.",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Signup failed" }, { status: 500 });
  }
}
