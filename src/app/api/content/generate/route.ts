import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, content_type, topic } = body;

    if (!platform || !content_type || !topic) {
      return NextResponse.json(
        { success: false, error: "Platform, content type, and topic are required" },
        { status: 400 }
      );
    }

    const generatedContent = {
      hooks: [
        `Nobody tells you this about ${topic}, but after years of experience, I can tell you the #1 mistake is...`,
        `I spent thousands testing strategies for ${topic} so you don't have to. Here are the 3 that actually work...`,
        `Stop doing THIS if you want to succeed with ${topic}. I wasted 2 years before I figured this out.`,
        `The truth about ${topic} that 97% of people don't know about...`,
        `What if I told you that your approach to ${topic} is completely wrong? Here's what actually works...`,
      ],
      script: `COLD OPEN:\n"What if I told you everything you know about ${topic} is wrong?"\n\nINTRO:\n"Hey everyone, today we're diving deep into ${topic}."\n\nSECTION 1: THE PROBLEM\n"Most people approach ${topic} the wrong way..."\n\nSECTION 2: THE SOLUTION\n"Here's the framework that actually works..."\n\nOUTRO:\n"If this helped, subscribe for more content like this."`,
      caption: `The ultimate guide to ${topic} that nobody talks about.\n\nSave this for later.`,
      hashtags: [`#${topic.replace(/\s+/g, "")}`, "#contentcreator", "#growthhacking", `#${platform}tips`, "#viral"],
      b_roll_list: ["Dynamic establishing shot", "Close-up of hands working", "Screen recording demonstration", "Time-lapse montage", "Reaction shots"],
      thumbnail_concept: `Bold text overlay reading "${topic.toUpperCase()}" with contrasting before/after split design.`,
    };

    return NextResponse.json({
      success: true,
      data: generatedContent,
      credits_used: 1,
      credits_remaining: 46,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to generate content" }, { status: 500 });
  }
}
