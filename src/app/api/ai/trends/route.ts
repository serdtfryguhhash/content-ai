import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { niche, platforms } = body;

    const response = await chat(
      [
        {
          role: "system",
          content: `You are a trend analysis engine for content creators. Generate 5 trending content ideas.
Return ONLY valid JSON array with this exact structure:
[
  {
    "id": "<unique-id>",
    "title": "<catchy title>",
    "description": "<2-3 sentence description>",
    "platform": "<best platform for this>",
    "trendScore": <number 1-10>,
    "hashtags": ["#tag1", "#tag2", "#tag3"],
    "whyTrending": "<1 sentence explaining why this is trending now>"
  }
]
Platform options: youtube, tiktok, instagram, twitter, linkedin, podcast, blog, newsletter`,
        },
        {
          role: "user",
          content: `Generate 5 trending content ideas for the ${niche || "general content creation"} niche. ${platforms?.length ? `Focus on these platforms: ${platforms.join(", ")}` : "Cover a mix of platforms."}`,
        },
      ],
      { temperature: 0.9, maxTokens: 2048 }
    );

    try {
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, response];
      const jsonStr = jsonMatch[1]?.trim() || response.trim();
      const trends = JSON.parse(jsonStr);

      return NextResponse.json({ success: true, data: trends });
    } catch {
      return NextResponse.json({
        success: true,
        data: [
          {
            id: "trend-1",
            title: "AI Tools Productivity Hack",
            description: "Show how you use AI tools to 10x your content output. Behind-the-scenes workflow walkthrough.",
            platform: "youtube",
            trendScore: 9,
            hashtags: ["#AItools", "#productivity", "#contentcreator"],
            whyTrending: "AI tool adoption is surging and creators want practical workflows.",
          },
          {
            id: "trend-2",
            title: "Day in the Life: Creator Edition",
            description: "Authentic day-in-the-life content showing the real behind-the-scenes of content creation.",
            platform: "tiktok",
            trendScore: 8,
            hashtags: ["#dayinthelife", "#creatorroutine", "#behindthescenes"],
            whyTrending: "Authenticity content consistently outperforms polished content on short-form platforms.",
          },
          {
            id: "trend-3",
            title: "Unpopular Opinion Thread",
            description: "Share contrarian takes about your niche that challenge conventional wisdom and spark debate.",
            platform: "twitter",
            trendScore: 8,
            hashtags: ["#unpopularopinion", "#hotttake", "#debate"],
            whyTrending: "Controversial takes drive massive engagement through quote tweets and replies.",
          },
          {
            id: "trend-4",
            title: "Carousel: Mistakes I Made",
            description: "Visual carousel sharing your biggest mistakes and lessons learned in your niche.",
            platform: "instagram",
            trendScore: 7,
            hashtags: ["#lessonslearned", "#mistakes", "#growthmindset"],
            whyTrending: "Vulnerability-based content builds trust and saves/shares ratio is very high.",
          },
          {
            id: "trend-5",
            title: "Industry Predictions for Next Quarter",
            description: "Thought leadership post predicting where your industry is heading with data-backed insights.",
            platform: "linkedin",
            trendScore: 7,
            hashtags: ["#predictions", "#thoughtleadership", "#futureofwork"],
            whyTrending: "Forward-looking content positions creators as authorities and drives professional engagement.",
          },
        ],
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Trend generation failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
