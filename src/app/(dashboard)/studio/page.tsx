"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Wand2, Copy, Download, Save, RefreshCw, Check,
  ChevronRight, Loader2, Hash, FileText, Camera, Film,
  MessageSquare, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { PLATFORMS, CONTENT_TYPES, TONES } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";
import { Platform, ContentType } from "@/types";

interface GeneratedContent {
  hooks: string[];
  script: string;
  caption: string;
  hashtags: string[];
  bRollList: string[];
  thumbnailConcept: string;
}

// Fallback content used when the AI API is unavailable
const FALLBACK_CONTENT: GeneratedContent = {
  hooks: [
    "Nobody tells you this about growing on social media, but after reaching 1M followers, I can tell you the #1 mistake creators make is...",
    "I spent $10,000 testing content strategies so you don't have to. Here are the 3 that actually work in 2026...",
    "Stop doing THIS if you want to grow. I wasted 2 years before I figured this out.",
    "The algorithm doesn't hate you -- you're just making this one critical mistake that 97% of creators don't know about.",
    "What if I told you that your content isn't the problem? After coaching 500+ creators, I found that the REAL issue is...",
  ],
  script: `COLD OPEN (0:00-0:15):
"What if I told you that 97% of content creators are making a critical mistake that's killing their growth?"

INTRO (0:15-0:45):
"Hey everyone, welcome back. Today I'm sharing something that completely changed how I approach content creation."

CHAPTER 1: THE PROBLEM (0:45-3:00):
"Most creators focus on the WRONG metrics. They obsess over views and followers, but completely ignore the metric that actually drives growth."

CHAPTER 2: THE FRAMEWORK (3:00-7:00):
"I call this the Content Depth Framework, and it has three pillars: Hook Hierarchy, Value Stack, and Engagement Loop."

OUTRO:
"If this video helped you, like and subscribe. Drop a comment telling me your biggest content creation challenge."`,
  caption: `The #1 mistake killing your content growth (and what to do instead).

I analyzed 500+ creators to find what separates the top 1% from everyone else.

The answer? It's not about posting more. It's about DEPTH.

Save this and implement it in your next piece of content.`,
  hashtags: [
    "#contentcreator", "#contentcreation", "#growthhacking", "#socialmediatips",
    "#creatoreconomy", "#contentstrategy", "#socialmediamarketing", "#youtubergrowth",
    "#creatortips", "#contentmarketing", "#digitalmarketing", "#growthstrategy",
    "#viralcontent", "#algorithmsecrets", "#creatorlife",
  ],
  bRollList: [
    "Scrolling through social media feeds on phone (close-up shot)",
    "Typing on laptop showing analytics dashboard",
    "Time-lapse of content planning whiteboard session",
    "Split screen comparison of two creator profiles",
    "Screen recording of actual content planning document",
  ],
  thumbnailConcept: `MAIN IMAGE: Split screen showing a frustrated creator on the left vs. a confident, successful creator on the right.

TEXT OVERLAY: "THE #1 MISTAKE" in bold text at the top, with "97% of Creators Make" below.

STYLE: High contrast, slightly oversaturated. Red/orange tint on the "before" side, green/blue tint on the "after" side.`,
};

function parseAIResponse(raw: string): GeneratedContent {
  // Try to extract JSON from the AI response
  try {
    // The AI might wrap JSON in markdown code fences
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, raw];
    const jsonStr = jsonMatch[1]?.trim() || raw.trim();
    const parsed = JSON.parse(jsonStr);

    return {
      hooks: Array.isArray(parsed.hooks)
        ? parsed.hooks.map((h: { text?: string } | string) => typeof h === "string" ? h : h.text || JSON.stringify(h))
        : FALLBACK_CONTENT.hooks,
      script: typeof parsed.script === "string" ? parsed.script : FALLBACK_CONTENT.script,
      caption: typeof parsed.caption === "string" ? parsed.caption : FALLBACK_CONTENT.caption,
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : FALLBACK_CONTENT.hashtags,
      bRollList: Array.isArray(parsed.brollList || parsed.bRollList)
        ? (parsed.brollList || parsed.bRollList).map((b: { shot?: string } | string) => typeof b === "string" ? b : b.shot || JSON.stringify(b))
        : FALLBACK_CONTENT.bRollList,
      thumbnailConcept: typeof parsed.thumbnailConcept === "string"
        ? parsed.thumbnailConcept
        : FALLBACK_CONTENT.thumbnailConcept,
    };
  } catch {
    // If JSON parsing fails, try to extract sections from plain text
    return {
      hooks: FALLBACK_CONTENT.hooks,
      script: raw || FALLBACK_CONTENT.script,
      caption: FALLBACK_CONTENT.caption,
      hashtags: FALLBACK_CONTENT.hashtags,
      bRollList: FALLBACK_CONTENT.bRollList,
      thumbnailConcept: FALLBACK_CONTENT.thumbnailConcept,
    };
  }
}

export default function StudioPage() {
  const { addNotification, consumeCredit } = useApp();
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [contentType, setContentType] = useState<ContentType>("long-form");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("");
  const [context, setContext] = useState("");
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("hooks");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addNotification({ id: Date.now().toString(), type: "warning", title: "Topic Required", message: "Please enter a topic for your content." });
      return;
    }
    if (!consumeCredit()) {
      addNotification({ id: Date.now().toString(), type: "error", title: "No Credits", message: "You've used all your credits. Upgrade to continue." });
      return;
    }
    setGenerating(true);
    setContent(null);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-content",
          platform,
          contentType,
          topic: `${topic}${audience ? ` | Target audience: ${audience}` : ""}${tone ? ` | Tone: ${tone}` : ""}${context ? ` | Additional context: ${context}` : ""}`,
          niche: "general",
        }),
      });

      const data = await res.json();

      if (data.success && data.response) {
        const parsed = parseAIResponse(data.response);
        setContent(parsed);
        addNotification({ id: Date.now().toString(), type: "success", title: "Content Generated!", message: "Your AI-powered content package is ready. Review and edit below." });
      } else {
        // API returned an error -- fall back to sample content
        console.warn("AI API error, using fallback:", data.error);
        setContent(FALLBACK_CONTENT);
        addNotification({ id: Date.now().toString(), type: "info", title: "Content Generated", message: "Generated with sample data. Set ANTHROPIC_API_KEY for AI-powered results." });
      }
    } catch (err) {
      // Network or other error -- fall back to sample content
      console.warn("AI request failed, using fallback:", err);
      setContent(FALLBACK_CONTENT);
      addNotification({ id: Date.now().toString(), type: "info", title: "Content Generated", message: "Generated with sample data. Check your API connection for AI-powered results." });
    }

    setGenerating(false);
  };

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredContentTypes = CONTENT_TYPES.filter((ct) => ct.platforms.includes(platform));

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        icon={Sparkles}
        title="AI Content Studio"
        description="Generate complete content packages for any platform in seconds"
      >
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="w-3 h-3" /> AI-Powered
        </Badge>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-secondary" />
                Content Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={platform} onValueChange={(v) => { setPlatform(v as Platform); setContentType(filteredContentTypes[0]?.value || "short-form"); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span className="flex items-center gap-2">
                          <span>{p.icon}</span> {p.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Select value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {filteredContentTypes.map((ct) => (
                      <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Topic / Idea <span className="text-destructive">*</span></label>
                <Textarea
                  placeholder="e.g., How to grow on YouTube in 2026 using AI tools for content creation"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Input
                  placeholder="e.g., Aspiring content creators ages 18-35"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Context</label>
                <Textarea
                  placeholder="Any specific angles, keywords, or requirements..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <Button
                variant="gradient"
                className="w-full h-12"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Content Package
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32"
              >
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <h3 className="font-display text-xl font-semibold mt-6 mb-2">Creating Your Content Package</h3>
                <p className="text-sm text-muted-foreground mb-6">Our AI is crafting hooks, scripts, captions, and more...</p>
                <div className="flex gap-2">
                  {["Hooks", "Script", "Caption", "Hashtags", "B-Roll", "Thumbnail"].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                      className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
                    >
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : content ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6 h-auto gap-1 bg-transparent p-0 mb-6">
                    {[
                      { value: "hooks", label: "Hooks", icon: Lightbulb, count: content.hooks.length },
                      { value: "script", label: "Script", icon: FileText },
                      { value: "caption", label: "Caption", icon: MessageSquare },
                      { value: "hashtags", label: "Hashtags", icon: Hash, count: content.hashtags.length },
                      { value: "broll", label: "B-Roll", icon: Film, count: content.bRollList.length },
                      { value: "thumbnail", label: "Thumbnail", icon: Camera },
                    ].map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-2.5 flex flex-col items-center gap-1 border"
                      >
                        <tab.icon className="w-4 h-4" />
                        <span className="text-xs">{tab.label}</span>
                        {tab.count && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{tab.count}</Badge>}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="hooks">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Generated Hooks</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleGenerate}>
                            <RefreshCw className="w-4 h-4 mr-1" /> Regenerate
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleCopy(content.hooks.join("\n\n"), "all-hooks")}>
                            {copiedField === "all-hooks" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                            Copy All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {content.hooks.map((hook, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-4 rounded-xl border hover:border-secondary/30 hover:bg-secondary/5 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <p className="text-sm leading-relaxed">{hook}</p>
                              </div>
                              <button
                                onClick={() => handleCopy(hook, `hook-${i}`)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                              >
                                {copiedField === `hook-${i}` ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                )}
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="script">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Full Script</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleCopy(content.script, "script")}>
                            {copiedField === "script" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" /> Export
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-primary/3 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                          {content.script}
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                          <span>~{content.script.split(/\s+/).length} words</span>
                          <span>~{Math.round(content.script.split(/\s+/).length / 150)} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="caption">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Post Caption</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(content.caption, "caption")}>
                          {copiedField === "caption" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          Copy
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-primary/3 rounded-xl p-6 text-sm leading-relaxed whitespace-pre-wrap">
                          {content.caption}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="hashtags">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Hashtags</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(content.hashtags.join(" "), "hashtags")}>
                          {copiedField === "hashtags" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          Copy All
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {content.hashtags.map((tag, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => handleCopy(tag, `tag-${i}`)}
                              className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors"
                            >
                              {copiedField === `tag-${i}` ? <Check className="w-3 h-3 inline mr-1" /> : null}
                              {tag}
                            </motion.button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="broll">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">B-Roll Shot List</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(content.bRollList.join("\n"), "broll")}>
                          {copiedField === "broll" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          Copy All
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {content.bRollList.map((shot, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/3 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                              </div>
                              <div className="flex items-center gap-2">
                                <Film className="w-4 h-4 text-muted-foreground shrink-0" />
                                <span className="text-sm">{shot}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="thumbnail">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Thumbnail Concept</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => handleCopy(content.thumbnailConcept, "thumbnail")}>
                          {copiedField === "thumbnail" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          Copy
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                          <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center mb-4 border-2 border-dashed border-secondary/30">
                            <div className="text-center">
                              <Camera className="w-12 h-12 text-secondary/50 mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Thumbnail Preview</p>
                              <p className="text-xs text-muted-foreground">Image generation available on Creator plan</p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                            {content.thumbnailConcept}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { setContent(null); setTopic(""); }}>
                      Start New
                    </Button>
                    <Button variant="outline">
                      <Save className="w-4 h-4 mr-2" /> Save Package
                    </Button>
                  </div>
                  <Button variant="gradient">
                    <CalendarIcon className="w-4 h-4 mr-2" /> Add to Calendar
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Ready to Create?</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                  Fill in your content brief on the left and hit Generate to create an AI-powered content package
                  with hooks, scripts, captions, hashtags, B-roll lists, and thumbnail concepts.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Select platform</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Enter topic</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Generate</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-secondary font-medium">Create amazing content</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  );
}
