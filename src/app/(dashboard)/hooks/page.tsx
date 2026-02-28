"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Copy, Check, Loader2, RefreshCw, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { PLATFORMS, HOOK_STYLES } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";
import { Platform, HookStyle } from "@/types";

const SAMPLE_HOOKS: Record<HookStyle, string[]> = {
  controversial: [
    "Everything your favorite guru told you about content creation is wrong. Here's the proof.",
    "Posting daily is DESTROYING your account. Here's what to do instead.",
    "I'm going to say something nobody in this industry wants to admit...",
    "The reason you're not growing has nothing to do with the algorithm.",
  ],
  curiosity: [
    "I found a loophole that 99% of creators don't know about — and it changed everything.",
    "There's a hidden feature in Instagram that nobody talks about. It tripled my reach.",
    "I accidentally discovered the secret to going viral. Here's what happened...",
    "This one simple change to my content strategy made me $50K in 30 days.",
  ],
  story: [
    "6 months ago, I was about to quit. I had 200 followers and zero income. Then I discovered...",
    "My first video got 12 views. My last video got 12 million. Here's everything that changed.",
    "I remember the exact moment I realized I was doing content creation completely wrong...",
    "The day I got fired was the best thing that ever happened to my creator career.",
  ],
  stat: [
    "97% of content creators never make a full-time income. Here's how the other 3% do it.",
    "The average TikTok user scrolls past your content in 0.3 seconds. Here's how to stop them.",
    "Creators who post at THIS time get 47% more engagement. (I tested 1,000 posts to prove it)",
    "Only 1 in 50 hooks actually stops the scroll. Here are the formulas that work every time.",
  ],
  question: [
    "What if everything you know about growing online is based on outdated advice?",
    "Have you ever wondered why some creators blow up while others with better content stay stuck?",
    "What would you do if you could create a week's worth of content in just 2 hours?",
    "Why do 95% of creators quit within the first year? (And how to make sure you don't)",
  ],
};

export default function HooksPage() {
  const { addNotification, consumeCredit } = useApp();
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [style, setStyle] = useState<HookStyle>("curiosity");
  const [generating, setGenerating] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedHooks, setSavedHooks] = useState<Set<number>>(new Set());

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addNotification({ id: Date.now().toString(), type: "warning", title: "Topic Required", message: "Please enter a topic for your hooks." });
      return;
    }
    if (!consumeCredit()) {
      addNotification({ id: Date.now().toString(), type: "error", title: "No Credits", message: "Upgrade to continue generating hooks." });
      return;
    }
    setGenerating(true);
    setHooks([]);
    setSavedHooks(new Set());
    await new Promise((r) => setTimeout(r, 2000));
    // Generate hooks based on all styles
    const allHooks: string[] = [];
    Object.values(SAMPLE_HOOKS).forEach((styleHooks) => {
      allHooks.push(...styleHooks);
    });
    // Shuffle and take 20
    const shuffled = allHooks.sort(() => Math.random() - 0.5).slice(0, 20);
    setHooks(shuffled);
    setGenerating(false);
    addNotification({ id: Date.now().toString(), type: "success", title: "Hooks Generated!", message: `20 hooks created in 5 styles for "${topic}"` });
  };

  const handleCopy = async (text: string, index: number) => {
    await copyToClipboard(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleSave = (index: number) => {
    setSavedHooks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        icon={Zap}
        title="Hook Generator"
        description="Generate 20 scroll-stopping hooks in 5 proven styles"
      />

      {/* Input Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Topic / Idea</label>
              <Input
                placeholder="e.g., Growing on YouTube in 2026"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.icon} {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">&nbsp;</label>
              <Button variant="gradient" className="w-full h-10" onClick={handleGenerate} disabled={generating}>
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-2" />Generate 20 Hooks</>}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hook Style Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {HOOK_STYLES.map((hs) => (
          <button
            key={hs.value}
            onClick={() => setStyle(hs.value)}
            className={`p-4 rounded-xl border text-center transition-all ${
              style === hs.value
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <div className="text-2xl mb-1">{hs.icon}</div>
            <p className="text-sm font-medium">{hs.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{hs.description}</p>
          </button>
        ))}
      </div>

      {/* Generated Hooks */}
      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-sm text-muted-foreground">Crafting 20 viral hooks in 5 styles...</p>
          </motion.div>
        ) : hooks.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{hooks.length} hooks generated</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="w-4 h-4 mr-1" /> Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCopy(hooks.join("\n\n"), -1)}>
                  {copiedIndex === -1 ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                  Copy All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hooks.map((hook, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group p-4 rounded-xl border hover:border-primary/30 hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full gradient-bg text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed flex-1">{hook}</p>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleSave(i)}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors"
                    >
                      {savedHooks.has(i) ? (
                        <BookmarkCheck className="w-4 h-4 text-primary" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(hook, i)}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Generate Viral Hooks</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Enter your topic above and select a style to generate 20 scroll-stopping hooks. 
              Each hook is optimized for maximum engagement on your chosen platform.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
