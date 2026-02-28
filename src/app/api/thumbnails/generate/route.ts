import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, text_overlay } = body;

    if (!topic) {
      return NextResponse.json({ success: false, error: "Topic is required" }, { status: 400 });
    }

    const concepts = [
      {
        title: "Bold Statement Design",
        description: `High-contrast thumbnail with bold text "${topic.toUpperCase()}" on a vibrant gradient background.`,
        text_overlay: text_overlay || topic.toUpperCase(),
        colors: ["#7C3AED", "#EC4899", "#F59E0B", "#FFFFFF"],
        layout: "Center-aligned bold text with accent elements",
      },
      {
        title: "Before/After Split",
        description: `Split-screen design showing transformation related to ${topic}.`,
        text_overlay: `BEFORE / AFTER: ${topic}`,
        colors: ["#EF4444", "#22C55E", "#FFFFFF", "#000000"],
        layout: "50/50 horizontal split with central divider",
      },
      {
        title: "Minimalist Authority",
        description: `Clean white background with premium typography about ${topic}.`,
        text_overlay: topic,
        colors: ["#FFFFFF", "#18181B", "#7C3AED"],
        layout: "Left-aligned text, right-side visual element",
      },
      {
        title: "Dark Cinematic",
        description: `Dark background with neon glow effects themed around ${topic}.`,
        text_overlay: topic.toUpperCase(),
        colors: ["#0F172A", "#7C3AED", "#EC4899", "#38BDF8"],
        layout: "Centered text with atmospheric glow",
      },
    ];

    return NextResponse.json({
      success: true,
      data: { concepts },
      credits_used: 1,
      credits_remaining: 43,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to generate thumbnails" }, { status: 500 });
  }
}
