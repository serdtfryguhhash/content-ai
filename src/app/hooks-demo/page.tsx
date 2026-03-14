"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Star,
  ArrowRight,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Platform = "tiktok" | "youtube" | "instagram" | "twitter" | "linkedin";
type HookStyle =
  | "question"
  | "bold"
  | "story"
  | "statistic"
  | "controversial";

interface GeneratedHook {
  id: number;
  text: string;
  rating: number;
  copied: boolean;
}

const PLATFORMS: { value: Platform; label: string; icon: string }[] = [
  { value: "tiktok", label: "TikTok", icon: "♪" },
  { value: "youtube", label: "YouTube", icon: "▶" },
  { value: "instagram", label: "Instagram", icon: "📷" },
  { value: "twitter", label: "Twitter", icon: "𝕏" },
  { value: "linkedin", label: "LinkedIn", icon: "in" },
];

const HOOK_STYLES: { value: HookStyle; label: string; emoji: string }[] = [
  { value: "question", label: "Question", emoji: "❓" },
  { value: "bold", label: "Bold Statement", emoji: "💥" },
  { value: "story", label: "Story", emoji: "📖" },
  { value: "statistic", label: "Statistic", emoji: "📊" },
  { value: "controversial", label: "Controversial", emoji: "🔥" },
];

const HOOK_TEMPLATES: Record<HookStyle, string[]> = {
  question: [
    "Did you know that {topic} can completely transform your results? Here's what nobody tells you...",
    "What if everything you believed about {topic} was wrong? Let me explain.",
    "Why do 90% of people fail at {topic}? The answer will surprise you.",
    "Have you ever wondered why some people crush it with {topic} while others struggle? Here's the secret...",
    "What's the #1 mistake people make with {topic}? (Hint: you're probably doing it right now)",
  ],
  bold: [
    "Stop overthinking {topic}. Here's what actually works in 2026.",
    "{topic} is easier than you think. I'm going to prove it in 60 seconds.",
    "Everyone's doing {topic} wrong. Let me show you the right way.",
    "I'm about to save you 100 hours of trial and error with {topic}. Pay attention.",
    "Forget everything you've learned about {topic}. This changes everything.",
  ],
  story: [
    "I spent 3 months learning {topic}. Here's the one thing that changed everything...",
    "6 months ago, I knew nothing about {topic}. Today I make a living from it. Here's how.",
    "I failed at {topic} 47 times before I discovered this. Now I can't stop winning.",
    "My mentor told me one thing about {topic} that I'll never forget. Let me share it with you.",
    "A year ago, someone gave me advice about {topic} that sounded crazy. It turned out to be genius.",
  ],
  statistic: [
    "97% of people get {topic} wrong. Are you one of them?",
    "People who master {topic} earn 3x more than those who don't. Here's the data.",
    "Only 2% of creators use this {topic} strategy. It generates 10x the results.",
    "Studies show that {topic} can boost your engagement by 340%. Here's exactly how.",
    "8 out of 10 people give up on {topic} in the first month. Don't be one of them.",
  ],
  controversial: [
    "Unpopular opinion: {topic} is completely overrated. Here's why...",
    "I'm going to say something about {topic} that might make you angry. But hear me out.",
    "Hot take: you don't need to be an expert at {topic} to succeed. In fact, it might hurt you.",
    "Everyone's hyping {topic} but nobody's talking about the dark side. Let me be real with you.",
    "I'm about to destroy the biggest myth about {topic}. You're not going to like this.",
  ],
};

function generateHooks(
  topic: string,
  style: HookStyle,
  platform: Platform
): GeneratedHook[] {
  const templates = HOOK_TEMPLATES[style];
  const cleanTopic = topic.trim().toLowerCase();

  const platformTags: Record<Platform, string> = {
    tiktok: " #fyp #{topicTag} #viral",
    youtube: "",
    instagram: " #{topicTag} #reels #trending",
    twitter: "",
    linkedin: "",
  };

  const topicTag = cleanTopic.replace(/\s+/g, "").slice(0, 20);
  const suffix = platformTags[platform].replace("{topicTag}", topicTag);

  return templates.map((template, index) => ({
    id: index,
    text: template.replace(/\{topic\}/g, cleanTopic) + suffix,
    rating: 0,
    copied: false,
  }));
}

export default function HooksDemoPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [hookStyle, setHookStyle] = useState<HookStyle>("question");
  const [hooks, setHooks] = useState<GeneratedHook[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setHooks([]);

    // Simulate generation delay for polish
    setTimeout(() => {
      const generated = generateHooks(topic, hookStyle, platform);
      setHooks(generated);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 800);
  }, [topic, hookStyle, platform]);

  const handleCopy = useCallback(async (hookId: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHooks((prev) =>
        prev.map((h) => (h.id === hookId ? { ...h, copied: true } : h))
      );
      setTimeout(() => {
        setHooks((prev) =>
          prev.map((h) => (h.id === hookId ? { ...h, copied: false } : h))
        );
      }, 2000);
    } catch {
      // Clipboard API not available
    }
  }, []);

  const handleRate = useCallback((hookId: number, rating: number) => {
    setHooks((prev) =>
      prev.map((h) => (h.id === hookId ? { ...h, rating } : h))
    );
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50/30 to-secondary-50/20" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-secondary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            No sign up required
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Free <span className="gradient-text">Hook Generator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Try it - no sign up required. Generate scroll-stopping hooks for any
            platform in seconds.
          </motion.p>
        </div>
      </section>

      {/* Generator */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-primary/10 shadow-xl p-6 sm:p-8"
        >
          {/* Topic Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Topic / Niche
            </label>
            <Input
              type="text"
              placeholder="Enter your content topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-12 text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
            />
          </div>

          {/* Platform & Style selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Platform
              </label>
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full h-12 rounded-lg border border-input bg-background px-3 pr-10 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.icon} {p.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Hook Style */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hook Style
              </label>
              <div className="relative">
                <select
                  value={hookStyle}
                  onChange={(e) => setHookStyle(e.target.value as HookStyle)}
                  className="w-full h-12 rounded-lg border border-input bg-background px-3 pr-10 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                >
                  {HOOK_STYLES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.emoji} {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            variant="gradient"
            size="lg"
            className="w-full group"
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
              </motion.div>
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            {isGenerating ? "Generating Hooks..." : "Generate 5 Hooks"}
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-secondary"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Crafting your hooks...
              </p>
            </motion.div>
          )}

          {!isGenerating && hooks.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Generated
                </div>
                <span className="text-sm text-muted-foreground">
                  5 hooks for &quot;{topic}&quot; on{" "}
                  {PLATFORMS.find((p) => p.value === platform)?.label}
                </span>
              </div>

              {hooks.map((hook, index) => (
                <motion.div
                  key={hook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white rounded-xl border border-primary/10 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-sm text-foreground leading-relaxed">
                      {hook.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(hook.id, star)}
                          className="p-0.5 hover:scale-125 transition-transform"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              star <= hook.rating
                                ? "fill-accent text-accent"
                                : "text-gray-300 hover:text-accent/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(hook.id, hook.text)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        hook.copied
                          ? "bg-green-100 text-green-700"
                          : "bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {hook.copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-gradient-to-br from-primary-50 via-accent-50/30 to-secondary-50/20 rounded-2xl p-8 text-center border border-primary/5"
              >
                <Sparkles className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Want Unlimited Hooks?
                </h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                  Sign up free to unlock unlimited hook generation, full
                  scripts, content calendars, and more.
                </p>
                <Link href="/signup">
                  <Button variant="gradient" size="lg" className="group">
                    Sign Up Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state hint */}
        {!hasGenerated && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Enter a topic above and click Generate to see your hooks appear
              here.
            </p>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}
