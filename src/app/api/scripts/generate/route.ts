import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json({ success: false, error: "Topic is required" }, { status: 400 });
    }

    const script = `COLD OPEN (0:00 - 0:20)\n\nWhat if I told you that everything you know about ${topic} is based on advice that's completely outdated?\n\nINTRO (0:20 - 1:00)\n\nHey everyone, welcome back. Today I'm breaking down ${topic}.\n\nSECTION 1: THE FOUNDATION (1:00 - 4:00)\n\nLet's start with the basics of ${topic}.\n\nSECTION 2: THE STRATEGY (4:00 - 8:00)\n\nNow here's where it gets interesting.\n\nSECTION 3: IMPLEMENTATION (8:00 - 12:00)\n\nLet me show you exactly how to implement this.\n\nOUTRO (12:00 - 13:00)\n\nLike this video. Subscribe for more.`;

    return NextResponse.json({
      success: true,
      data: {
        script,
        word_count: script.split(/\s+/).length,
        estimated_duration: `${Math.round(script.split(/\s+/).length / 150)} minutes`,
        outline: ["Foundation", "Strategy", "Implementation", "Outro"],
      },
      credits_used: 1,
      credits_remaining: 44,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to generate script" }, { status: 500 });
  }
}
