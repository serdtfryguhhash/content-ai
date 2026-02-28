"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Loader2, Copy, Check, Download, Maximize2, Play, Pause, RotateCcw, ChevronUp, ChevronDown, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/lib/constants";
import { copyToClipboard, estimateVideoLength } from "@/lib/utils";
import { Platform } from "@/types";

const SAMPLE_SCRIPT = `COLD OPEN (0:00 - 0:20)

What if I told you that everything you know about building an audience online is based on advice from 2020 — and the game has completely changed?

[B-ROLL: Quick cuts of social media notifications, growing follower counts, viral content examples]

INTRO (0:20 - 1:00)

Hey everyone, welcome back to the channel. Today, I'm breaking down the 5 new rules of audience building in 2026 — and trust me, if you're still following the old playbook, this video is going to be a wake-up call.

Before we dive in, quick favor — if you find this valuable, smash that like button. It genuinely helps the channel, and it takes less than a second. Alright, let's get into it.

SECTION 1: THE DEATH OF "JUST BE CONSISTENT" (1:00 - 4:00)

For years, every content guru said the same thing: "Just be consistent, post every day, and you'll grow." And look, there's truth to that. Consistency matters. But in 2026, consistency WITHOUT strategy is just organized failure.

Here's what I mean. The platforms have evolved. The algorithms are smarter. And your audience's attention span is shorter than ever. Posting daily with mediocre content isn't just ineffective — it's actually hurting you.

The new rule? STRATEGIC consistency. That means:
- Quality over quantity, always
- Posting when YOUR specific audience is online
- Having a content pillar strategy, not random topics
- Building in feedback loops to improve every week

Let me show you exactly how to implement this...

[SCREEN SHARE: Content calendar example with strategic posting schedule]

SECTION 2: THE "DEPTH OVER BREADTH" PRINCIPLE (4:00 - 7:00)

The second major shift is what I call "Depth Over Breadth." In the early days of social media, going wide worked. You could create surface-level content about trending topics and ride the wave.

But the algorithm has gotten incredibly sophisticated. It now rewards EXPERTISE over virality. It wants to show users content from trusted authorities in specific niches.

So instead of trying to appeal to everyone, go deep on YOUR specific topic. Become the go-to person for ONE thing. Then expand from there.

Here's my framework for this:
1. Pick your core expertise
2. Create a "content moat" — content that only YOU can make
3. Build topical authority with clusters of related content
4. Let the algorithm recognize you as an expert

SECTION 3: THE COMMUNITY-FIRST APPROACH (7:00 - 10:00)

This is the biggest shift, and most creators are completely missing it. The platforms are HEAVILY rewarding community engagement now. Comments, shares, saves, DMs — these signals matter more than ever.

But here's the thing — you can't just ask for engagement. You have to BUILD genuine community.

What does that look like?
- Reply to every comment for the first hour after posting
- Create content that sparks conversation, not just consumption
- Build off-platform community (Discord, newsletter, etc.)
- Feature your audience in your content

The creators who are growing fastest right now aren't just content creators — they're community builders.

SECTION 4: AI AS YOUR CREATIVE PARTNER (10:00 - 12:30)

Let's talk about the elephant in the room: AI. Yes, I use AI in my content creation process. No, I don't let AI create my content FOR me. There's a massive difference.

Here's how I use AI effectively:
- Brainstorming and ideation (generating 50 ideas, filtering to the best 5)
- Research acceleration (summarizing articles, finding data points)
- Editing and optimization (improving hooks, captions, thumbnails)
- Repurposing (turning one video into 10 pieces of content)

The key is using AI to amplify YOUR voice, not replace it. Your audience follows you for YOUR perspective, YOUR experiences, YOUR personality. AI can't replicate that.

SECTION 5: THE MULTI-PLATFORM FLYWHEEL (12:30 - 14:30)

The final rule — and this is crucial — is the multi-platform flywheel. In 2026, relying on a single platform is incredibly risky. Algorithm changes, policy updates, even platform shutdowns can wipe out everything overnight.

The smart move? Create a flywheel where each platform feeds the others:
- Long-form on YouTube → clips on TikTok and Reels
- Clips drive traffic back to YouTube
- Both drive newsletter signups
- Newsletter builds direct relationship
- Direct relationship drives product sales
- Product sales fund better content

This flywheel is how creators are building sustainable, multi-million dollar businesses.

OUTRO (14:30 - 15:30)

So to recap the 5 new rules:
1. Strategic consistency over blind posting
2. Depth over breadth
3. Community first
4. AI as a creative partner
5. The multi-platform flywheel

If you implement even ONE of these, you'll be ahead of 90% of creators. If you implement all five? Sky's the limit.

Like this video if it was helpful. Subscribe if you want more content strategy breakdowns every Tuesday and Friday. And drop a comment telling me — which rule are you going to implement first?

I'll see you in the next one. Peace.

[END SCREEN: Suggested video on content calendar strategy]`;

export default function ScriptsPage() {
  const { addNotification, consumeCredit } = useApp();
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [generating, setGenerating] = useState(false);
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);
  const [teleprompterPlaying, setTeleprompterPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [fontSize, setFontSize] = useState(32);
  const teleprompterRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addNotification({ id: Date.now().toString(), type: "warning", title: "Topic Required", message: "Please enter a topic for your script." });
      return;
    }
    if (!consumeCredit()) {
      addNotification({ id: Date.now().toString(), type: "error", title: "No Credits", message: "Upgrade for more scripts." });
      return;
    }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 3000));
    setScript(SAMPLE_SCRIPT);
    setGenerating(false);
    addNotification({ id: Date.now().toString(), type: "success", title: "Script Generated!", message: "Your full script is ready. Edit and use the teleprompter." });
  };

  const handleCopy = async () => {
    await copyToClipboard(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Teleprompter scroll logic
  useEffect(() => {
    if (teleprompterPlaying && teleprompterRef.current) {
      const el = teleprompterRef.current;
      const scroll = () => {
        el.scrollTop += scrollSpeed * 0.5;
        if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
          setTeleprompterPlaying(false);
          return;
        }
        animationRef.current = requestAnimationFrame(scroll);
      };
      animationRef.current = requestAnimationFrame(scroll);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [teleprompterPlaying, scrollSpeed]);

  const wordCount = script.split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={FileText} title="Script Writer" description="AI-powered long-form scripts with teleprompter mode" />

      {/* Input Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Topic / Idea</label>
              <Input placeholder="e.g., 5 New Rules of Audience Building in 2026" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (<SelectItem key={p.value} value={p.value}>{p.icon} {p.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Length</label>
              <Select value={length} onValueChange={(v) => setLength(v as "short" | "medium" | "long")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (2-5 min)</SelectItem>
                  <SelectItem value="medium">Medium (5-15 min)</SelectItem>
                  <SelectItem value="long">Long (15-30 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="gradient" onClick={handleGenerate} disabled={generating}>
              {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating Script...</> : <><Sparkles className="w-4 h-4 mr-2" />Generate Full Script</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Script Output */}
      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
            <motion.div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <FileText className="w-8 h-8 text-white" />
            </motion.div>
            <p className="font-display font-semibold mb-1">Writing Your Script</p>
            <p className="text-sm text-muted-foreground">Creating outline, sections, and teleprompter-ready copy...</p>
          </motion.div>
        ) : script ? (
          <motion.div key="script" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-lg">Generated Script</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{wordCount} words</span>
                    <span>~{estimateVideoLength(wordCount)} video</span>
                    <span>~{Math.ceil(wordCount / 200)} min read</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />} Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" /> Export
                  </Button>
                  <Button variant="gradient" size="sm" onClick={() => setTeleprompterOpen(true)}>
                    <Maximize2 className="w-4 h-4 mr-1" /> Teleprompter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[600px] font-mono text-sm leading-relaxed"
                />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Write AI-Powered Scripts</h3>
            <p className="text-sm text-muted-foreground max-w-md">Enter your topic and let AI write a complete, structured script with a teleprompter-ready format. Edit freely and record with the built-in teleprompter.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teleprompter Mode */}
      <AnimatePresence>
        {teleprompterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
            {/* Controls */}
            <div className="flex items-center justify-between px-6 py-4 bg-black/80 border-b border-white/10">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTeleprompterPlaying(!teleprompterPlaying);
                  }}
                  className="text-white hover:bg-white/10"
                >
                  {teleprompterPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTeleprompterPlaying(false);
                    if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0;
                  }}
                  className="text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <span>Speed:</span>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setScrollSpeed(Math.max(0.5, scrollSpeed - 0.5))}>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-mono w-8 text-center">{scrollSpeed}x</span>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setScrollSpeed(Math.min(5, scrollSpeed + 0.5))}>
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <span>Size:</span>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setFontSize(Math.max(16, fontSize - 4))}>
                    <span className="text-xs">A-</span>
                  </Button>
                  <span className="text-white font-mono w-8 text-center">{fontSize}</span>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setFontSize(Math.min(72, fontSize + 4))}>
                    <span className="text-lg font-bold">A+</span>
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTeleprompterOpen(false);
                  setTeleprompterPlaying(false);
                }}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5 mr-1" /> Exit
              </Button>
            </div>

            {/* Script Content */}
            <div className="flex-1 relative overflow-hidden">
              {/* Center guide line */}
              <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-red-500/50 z-10 pointer-events-none" />
              <div
                ref={teleprompterRef}
                className="h-full overflow-y-auto px-8 md:px-16 lg:px-32 py-[33vh]"
                style={{ scrollBehavior: teleprompterPlaying ? "auto" : "smooth" }}
              >
                <div
                  className="text-white leading-relaxed whitespace-pre-wrap max-w-3xl mx-auto"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
                >
                  {script}
                </div>
                <div className="h-[66vh]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
