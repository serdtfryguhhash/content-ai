import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  void searchParams.get("period");

  // In production: Query from Supabase
  const analyticsData = {
    totalContent: 124,
    totalViews: 2456789,
    totalEngagement: 189432,
    avgEngagementRate: 4.8,
    topPlatform: "youtube",
    contentByPlatform: [
      { platform: "youtube", count: 24 },
      { platform: "tiktok", count: 45 },
      { platform: "instagram", count: 38 },
      { platform: "twitter", count: 62 },
      { platform: "linkedin", count: 15 },
    ],
    performanceOverTime: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split("T")[0],
      views: Math.floor(Math.random() * 50000) + 20000,
      engagement: Math.floor(Math.random() * 5000) + 1000,
    })),
    growthRate: 23.5,
  };

  return NextResponse.json({ success: true, data: analyticsData });
}
