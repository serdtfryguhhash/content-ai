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

const SAMPLE_CONTENT: Record<string, GeneratedContent> = {
  default: {
    hooks: [
      "Nobody tells you this about growing on social media, but after reaching 1M followers, I can tell you the #1 mistake creators make is...",
      "I spent $10,000 testing content strategies so you don't have to. Here are the 3 that actually work in 2026...",
      "Stop doing THIS if you want to grow. I wasted 2 years before I figured this out.",
      "The algorithm doesn't hate you — you're just making this one critical mistake that 97% of creators don't know about.",
      "What if I told you that your content isn't the problem? After coaching 500+ creators, I found that the REAL issue is...",
    ],
    script: `COLD OPEN (0:00-0:15):
"What if I told you that 97% of content creators are making a critical mistake that's killing their growth? And the worst part? Most of them don't even know they're doing it."

[B-ROLL: Quick montage of scrolling through social media feeds]

INTRO (0:15-0:45):
"Hey everyone, welcome back to the channel. I'm [Name], and today I'm going to share something that completely changed how I approach content creation. This isn't theory — this is based on data from over 500 creators I've worked with."

[GRAPHIC: Show "500+ Creators Analyzed" text overlay]

CHAPTER 1: THE PROBLEM (0:45-3:00):
"So here's the thing — most creators focus on the WRONG metrics. They obsess over views and followers, but completely ignore the metric that actually drives growth."

"Let me show you what I mean. Take a look at these two creators..."

[SCREEN SHARE: Side-by-side comparison of two creator profiles]

"Creator A has 100K followers but gets 500 views per video. Creator B has 10K followers but gets 50,000 views per video. Who would you rather be?"

"The difference? Creator B understands one thing that Creator A doesn't: ENGAGEMENT DEPTH."

CHAPTER 2: THE FRAMEWORK (3:00-7:00):
"I call this the Content Depth Framework, and it has three pillars:"

"Pillar 1: The Hook Hierarchy
Your hook isn't just the first line — it's the first 3 seconds, the first 30 seconds, AND the first 3 minutes. Each one serves a different purpose."

[GRAPHIC: Hook Hierarchy pyramid visual]

"Pillar 2: The Value Stack
Don't just give one piece of value. Stack multiple value moments throughout your content so viewers always feel like the next insight is coming."

[GRAPHIC: Value Stack timeline visual]

"Pillar 3: The Engagement Loop
End every piece of content with something that makes people want to engage — not just consume."

[GRAPHIC: Engagement loop diagram]

CHAPTER 3: IMPLEMENTATION (7:00-11:00):
"Now let me show you exactly how to implement this. I'm going to walk you through my actual content creation process."

"Step 1: Before I create anything, I write down 5 hooks using different styles — controversial, curiosity, story, stat, and question. Then I test them."

"Step 2: I map out my value stack. For a 10-minute video, I aim for at least 7 distinct value moments."

"Step 3: I craft my engagement loop. This could be a question, a challenge, or a teaser for the next video."

[SCREEN SHARE: Walk through actual content planning document]

CHAPTER 4: RESULTS (11:00-13:00):
"Since implementing this framework, here are my actual numbers:"

"Views per video: Up 340%
Average watch time: Up from 2:30 to 8:45
Comments per video: Up 500%
New subscribers per video: Up 250%"

[GRAPHIC: Before/after metrics dashboard]

"And it's not just me. Here are results from creators who've used this framework..."

OUTRO (13:00-14:00):
"If this video helped you, smash that like button and subscribe for more content strategy breakdowns every Tuesday and Friday."

"Drop a comment telling me: What's YOUR biggest content creation challenge right now?"

"And watch THIS video next — I break down the exact hook formulas I use to stop the scroll every single time."

[END SCREEN with video suggestion]`,
    caption: `The #1 mistake killing your content growth (and what to do instead) 🎯

I analyzed 500+ creators to find what separates the top 1% from everyone else.

The answer? It's not about posting more. It's not about trends. It's about DEPTH.

In this video, I break down my Content Depth Framework:
📌 The Hook Hierarchy
📌 The Value Stack  
📌 The Engagement Loop

The results speak for themselves:
📈 340% more views
⏱️ 3.5x longer watch time
💬 5x more comments

Save this and implement it in your next piece of content 💾

What's your biggest content challenge? Tell me below 👇`,
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
      "Animated graphics: pyramid, timeline, and loop diagrams",
      "Screen recording of actual content planning document",
      "Before/after metrics dashboard animation",
      "Montage of successful creators creating content",
      "Close-up of hand drawing framework on iPad",
      "Cinematic shot of creator in professional studio setup",
    ],
    thumbnailConcept: `MAIN IMAGE: Split screen showing a frustrated creator on the left (holding head, looking at phone with sad analytics) vs. a confident, successful creator on the right (celebrating with confetti, showing amazing analytics on screen).

TEXT OVERLAY: "THE #1 MISTAKE" in bold yellow text at the top, with "97% of Creators Make" in white below it.

STYLE: High contrast, slightly oversaturated colors. Red/orange tint on the "before" side, green/blue tint on the "after" side. Large facial expressions for emotional impact.

ELEMENTS: Red X on the left side, Green checkmark on the right. Arrow pointing from left to right showing transformation.`,
  },
};

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
    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 3000));
    setContent(SAMPLE_CONTENT.default);
    setGenerating(false);
    addNotification({ id: Date.now().toString(), type: "success", title: "Content Generated!", message: "Your content package is ready. Review and edit below." });
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
                <Wand2 className="w-5 h-5 text-primary" />
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
                  placeholder="e.g., The biggest content creation mistakes new creators make and how to avoid them"
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
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
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
                            className="group p-4 rounded-xl border hover:border-primary/30 hover:bg-primary/5 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
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
                        <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">
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
                        <div className="bg-gray-50 rounded-xl p-6 text-sm leading-relaxed whitespace-pre-wrap">
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
                              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
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
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold shrink-0">
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
                          <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center mb-4 border-2 border-dashed border-primary/30">
                            <div className="text-center">
                              <Camera className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Thumbnail Preview</p>
                              <p className="text-xs text-muted-foreground">DALL-E 3 generation available on Creator plan</p>
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
                    <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
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
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Ready to Create?</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                  Fill in your content brief on the left and hit Generate to create a complete content package 
                  with hooks, scripts, captions, hashtags, B-roll lists, and thumbnail concepts.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Select platform</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Enter topic</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Generate</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary font-medium">Create amazing content</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  );
}
