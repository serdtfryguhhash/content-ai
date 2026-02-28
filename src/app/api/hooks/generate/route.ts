import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, style, platform, count = 20 } = body;

    if (!topic) {
      return NextResponse.json({ success: false, error: "Topic is required" }, { status: 400 });
    }

    const hookTemplates: Record<string, string[]> = {
      controversial: [
        `Everything your favorite guru told you about ${topic} is wrong.`,
        `${topic} is a lie, and here's the proof nobody wants you to see.`,
        `Stop listening to advice about ${topic}. 90% of it is outdated.`,
        `The industry doesn't want you to know this about ${topic}.`,
      ],
      curiosity: [
        `I found a loophole in ${topic} that changed everything...`,
        `There's a hidden secret about ${topic} that nobody talks about.`,
        `This one simple change to ${topic} made me $50K in 30 days.`,
        `I accidentally discovered the truth about ${topic}. Here's what happened...`,
      ],
      story: [
        `6 months ago, I knew nothing about ${topic}. Then I discovered...`,
        `My first attempt at ${topic} was a disaster. Here's what I learned.`,
        `I remember the exact moment ${topic} changed my life forever.`,
        `The day I failed at ${topic} was the best thing that ever happened.`,
      ],
      stat: [
        `97% of people get ${topic} wrong. Here's what the data shows.`,
        `Studies show that ${topic} can increase results by 340%. Here's how.`,
        `Only 3% of people know this about ${topic}. The numbers don't lie.`,
        `I analyzed 1,000 examples of ${topic}. The results were shocking.`,
      ],
      question: [
        `What if everything you know about ${topic} is based on outdated advice?`,
        `Have you ever wondered why some people succeed at ${topic} while others fail?`,
        `What would you do if you could master ${topic} in just 30 days?`,
        `Why do 95% of people quit ${topic} within the first year?`,
      ],
    };

    const allHooks: string[] = [];
    if (style && hookTemplates[style]) {
      allHooks.push(...hookTemplates[style]);
    } else {
      Object.values(hookTemplates).forEach((hooks) => allHooks.push(...hooks));
    }

    const shuffled = allHooks.sort(() => Math.random() - 0.5).slice(0, Math.min(count, allHooks.length));

    return NextResponse.json({
      success: true,
      data: { hooks: shuffled, style, platform, topic },
      credits_used: 1,
      credits_remaining: 45,
    });
  } catch (error) {
    console.error("Hook generation error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate hooks" }, { status: 500 });
  }
}
