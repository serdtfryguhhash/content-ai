import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, sourcePlatform, title } = body;

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    const response = await chat(
      [
        {
          role: "system",
          content: `You are a content repurposing expert. Take the given content and adapt it for 8 different platforms.
Return ONLY valid JSON array with this exact structure:
[
  {
    "platform": "<platform name>",
    "title": "<adapted title>",
    "content": "<full adapted content>",
    "format": "<format description e.g. 'Short-form video script'>",
    "tips": "<1-2 tips for this platform adaptation>"
  }
]
Platforms to cover: youtube, tiktok, instagram, twitter, linkedin, podcast, blog, newsletter
Each adaptation should be genuinely different and optimized for that specific platform's audience and format.`,
        },
        {
          role: "user",
          content: `Repurpose this ${sourcePlatform || "original"} content titled "${title || "Untitled"}" for all 8 platforms:\n\n${content}`,
        },
      ],
      { temperature: 0.8, maxTokens: 4096 }
    );

    try {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, response];
      const jsonStr = jsonMatch[1]?.trim() || response.trim();
      const repurposed = JSON.parse(jsonStr);

      return NextResponse.json({ success: true, data: repurposed });
    } catch {
      const platforms = ["youtube", "tiktok", "instagram", "twitter", "linkedin", "podcast", "blog", "newsletter"];
      const fallback = platforms.map((p) => ({
        platform: p,
        title: `${title || "Content"} - ${p.charAt(0).toUpperCase() + p.slice(1)} Edition`,
        content: `Adapted version of your content for ${p}. Original: ${content.slice(0, 200)}...`,
        format: `Optimized ${p} format`,
        tips: `Tailor your hook for ${p}'s audience and use platform-native features.`,
      }));
      return NextResponse.json({ success: true, data: fallback });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Repurpose failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
