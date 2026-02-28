import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    // In production: Exchange code for session with Supabase
    // const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/studio", req.url));
}
