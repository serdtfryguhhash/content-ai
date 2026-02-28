import { NextRequest, NextResponse } from "next/server";
import { chat, generateContentPackage, generateHooks, generateScript, suggestPostingTimes } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, message, platform, contentType, topic, niche, count, targetLength, style } = body;

    let response: string;

    switch (action) {
      case "generate-content":
        response = await generateContentPackage({ platform, contentType, topic, niche });
        break;
      case "generate-hooks":
        response = await generateHooks(topic || message, count || 20);
        break;
      case "generate-script":
        response = await generateScript({ topic: topic || message, platform, targetLength, style });
        break;
      case "posting-times":
        response = await suggestPostingTimes(platform, niche);
        break;
      case "chat":
      default:
        response = await chat([
          {
            role: "system",
            content: "You are Content.ai's creative assistant. Help creators produce viral content. Be creative and specific.",
          },
          { role: "user", content: message },
        ]);
        break;
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch("http://localhost:11434/api/tags");
    if (!res.ok) return NextResponse.json({ available: false });
    return NextResponse.json({ available: true, model: "llama3.2" });
  } catch {
    return NextResponse.json({ available: false, error: "Ollama is not running" });
  }
}
