/**
 * Content.ai — AI Client powered by Ollama (local LLM, zero API keys)
 *
 * Connects to Ollama at http://localhost:11434/v1 using llama3.2
 */

const OLLAMA_BASE_URL = "http://localhost:11434/v1";
const MODEL = "llama3.2";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: Array<{ message: { role: string; content: string } }>;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: options.temperature ?? 0.8,
        max_tokens: options.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
    const data: ChatResponse = await response.json();
    return data.choices[0]?.message?.content ?? "No response generated.";
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Ollama is not running. Open the Ollama app from Applications.");
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
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) return { available: false, model: MODEL, error: "Ollama not responding" };
    const data = await response.json();
    const found = data.models?.some((m: { name: string }) => m.name.startsWith(MODEL));
    return { available: !!found, model: MODEL, error: found ? undefined : `Model ${MODEL} not found` };
  } catch {
    return { available: false, model: MODEL, error: "Ollama is not running" };
  }
}
