import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    // In production: Supabase Auth
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: "demo-user-1",
          email,
          full_name: "Alex Creator",
          subscription_tier: "creator",
        },
        session: { access_token: "demo-token", refresh_token: "demo-refresh" },
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
