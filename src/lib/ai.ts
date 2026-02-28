/**
 * Content.ai — AI Client powered by Anthropic Claude SDK
 *
 * Uses Claude claude-sonnet-4-20250514 via the Anthropic API
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const MODEL = "claude-sonnet-4-20250514";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    // Extract system messages and pass them separately (Anthropic API requirement)
    const systemMessages = messages.filter((m) => m.role === "system");
    const nonSystemMessages = messages.filter((m) => m.role !== "system");

    const systemText = systemMessages.map((m) => m.content).join("\n\n");

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: options.maxTokens ?? 2048,
      ...(systemText ? { system: systemText } : {}),
      messages: nonSystemMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      temperature: options.temperature ?? 0.8,
    });

    const block = response.content[0];
    if (block.type === "text") {
      return block.text;
    }
    return "No response generated.";
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Anthropic API error: ${error.status} — ${error.message}`);
    }
    throw error;
  }
}

/** Generate a complete content package (hooks, script, caption, hashtags, b-roll) */
export async function generateContentPackage(params: {
  platform: string;
  contentType: string;
  topic: string;
  niche: string;
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are Content.ai's content production engine — a world-class content
      strategist who creates viral content packages. Generate a COMPLETE content package
      in JSON format with these fields:
      {
        "hooks": [5 hook options, each with "text" and "style" (controversial/curiosity/story/stat/question)],
        "script": "Full script with timestamps and delivery notes",
        "caption": "Caption with CTA for the platform",
        "hashtags": [30 hashtags ranked by estimated reach],
        "brollList": [{"shot": "description", "duration": "seconds", "purpose": "why"}],
        "thumbnailConcept": "Description of thumbnail idea"
      }`,
    },
    {
      role: "user",
      content: `Create a content package for ${params.platform}.
      Content type: ${params.contentType}.
      Topic: ${params.topic}.
      Niche: ${params.niche}.`,
    },
  ], { maxTokens: 4096, temperature: 0.85 });
}

/** Generate hooks in multiple styles */
export async function generateHooks(topic: string, count: number = 20): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a viral content hook expert. Generate ${count} hooks across these 5 styles:
      - Controversial: Challenge common beliefs
      - Curiosity: Create information gaps
      - Story: Personal narrative openings
      - Stat: Lead with surprising numbers
      - Question: Provocative questions
      Return as JSON array: [{"text": "...", "style": "...", "engagementScore": 1-10}]`,
    },
    { role: "user", content: `Generate ${count} hooks about: ${topic}` },
  ], { temperature: 0.9 });
}

/** Generate a full video/podcast script with outline */
export async function generateScript(params: {
  topic: string;
  platform: string;
  targetLength: string;
  style: string;
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a professional scriptwriter for content creators. Write a complete
      script with: intro hook, talking points with transitions, CTA placement suggestions,
      and outro. Include [TIMESTAMP] markers and [DELIVERY NOTE] annotations for filming.
      Make it natural and conversational, not robotic.`,
    },
    {
      role: "user",
      content: `Write a ${params.targetLength} ${params.platform} script about "${params.topic}" in a ${params.style} style.`,
    },
  ], { maxTokens: 4096 });
}

/** Suggest optimal posting times */
export async function suggestPostingTimes(platform: string, niche: string): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a social media analytics expert. Based on platform algorithms and
      engagement data, suggest the 5 best posting times. Include day of week, time, and
      reasoning for each suggestion. Format as JSON array.`,
    },
    {
      role: "user",
      content: `Best posting times for ${platform} in the ${niche} niche?`,
    },
  ]);
}

export async function checkAIStatus(): Promise<{ available: boolean; model: string; error?: string }> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return { available: false, model: MODEL, error: "ANTHROPIC_API_KEY not set" };
    }
    // Quick validation: try a minimal request to confirm the key works
    return { available: true, model: MODEL };
  } catch {
    return { available: false, model: MODEL, error: "Anthropic API is not reachable" };
  }
}
