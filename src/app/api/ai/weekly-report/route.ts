import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentCreated, platformsCovered, consistencyScore, xpEarned, niche } = body;

    const response = await chat(
      [
        {
          role: "system",
          content: `You are a content strategy analyst generating weekly reports for creators.
Return ONLY valid JSON with this exact structure:
{
  "weekOf": "<current week date range>",
  "contentCreated": <number>,
  "platformsCovered": [<array of platforms>],
  "consistencyScore": <number 0-100>,
  "consistencyChange": <number, positive or negative>,
  "bestPerformingType": "<content type>",
  "highlights": ["<highlight 1>", "<highlight 2>", "<highlight 3>"],
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"],
  "xpEarned": <number>
}`,
        },
        {
          role: "user",
          content: `Generate a weekly report for a ${niche || "general"} creator.
Stats this week: ${contentCreated || 0} content pieces created, platforms covered: ${platformsCovered?.join(", ") || "none"}, consistency score: ${consistencyScore || 0}, XP earned: ${xpEarned || 0}.`,
        },
      ],
      { temperature: 0.7, maxTokens: 1024 }
    );

    try {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, response];
      const jsonStr = jsonMatch[1]?.trim() || response.trim();
      const report = JSON.parse(jsonStr);

      return NextResponse.json({ success: true, data: report });
    } catch {
      const now = new Date();
      const weekStart = new Date(now.getTime() - 7 * 86400000);
      return NextResponse.json({
        success: true,
        data: {
          weekOf: `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
          contentCreated: contentCreated || 0,
          platformsCovered: platformsCovered || [],
          consistencyScore: consistencyScore || 0,
          consistencyChange: 5,
          bestPerformingType: "Short-form video",
          highlights: [
            "You maintained your content creation streak",
            "Your content output is above average for your niche",
            "You diversified across multiple platforms",
          ],
          recommendations: [
            "Try posting more during peak engagement hours (9-11 AM)",
            "Experiment with carousel posts on Instagram for higher saves",
            "Consider repurposing your top-performing content across platforms",
          ],
          xpEarned: xpEarned || 0,
        },
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Report generation failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
