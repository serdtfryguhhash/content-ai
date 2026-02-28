"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Sparkles, Loader2, Download, Copy, Check, Palette, Type, Layout, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { copyToClipboard } from "@/lib/utils";

const THUMBNAIL_STYLES = [
  { value: "bold-text", label: "Bold Text", description: "Large text with eye-catching colors" },
  { value: "face-reaction", label: "Face + Reaction", description: "Expressive face with text overlay" },
  { value: "before-after", label: "Before/After", description: "Split comparison layout" },
  { value: "minimal", label: "Minimal", description: "Clean, minimal design" },
  { value: "collage", label: "Collage", description: "Multiple images in grid layout" },
  { value: "dark-dramatic", label: "Dark & Dramatic", description: "Dark background with neon accents" },
];

const SAMPLE_CONCEPTS = [
  {
    title: "Bold Statement Thumbnail",
    description: "A vibrant gradient background (purple to pink) with large white bold text reading 'THE #1 MISTAKE' at the top. Below, in slightly smaller yellow text: '97% of Creators Make'. Include a shocked face emoji and arrow pointing down. High contrast, oversaturated.",
    textOverlay: "THE #1 MISTAKE\n97% of Creators Make",
    colors: ["#1a1a2e", "#e94560", "#F59E0B", "#FFFFFF"],
    layout: "Center-aligned text with emoji accents",
  },
  {
    title: "Split Comparison Thumbnail",
    description: "Left side: Red-tinted image of frustrated person at desk with low analytics on screen, text '200 Views'. Right side: Green-tinted image of celebrating person with confetti, text '2M Views'. Large arrow in the middle showing transformation. Bold text at top: 'I Changed ONE Thing'.",
    textOverlay: "I Changed ONE Thing\n200 Views → 2M Views",
    colors: ["#EF4444", "#22C55E", "#FFFFFF", "#FBBF24"],
    layout: "50/50 split with central arrow",
  },
  {
    title: "Minimal Authority Thumbnail",
    description: "Clean white background with a professional headshot on the right side. Large black serif text on the left: '5 Rules That Changed Everything'. Subtle purple accent line below the text. Small badge icon reading 'New 2026'. Very clean, premium feel.",
    textOverlay: "5 Rules That\nChanged Everything",
    colors: ["#FFFFFF", "#18181B", "#1a1a2e", "#F5F5F5"],
    layout: "Left text, right image, clean spacing",
  },
  {
    title: "Dark Dramatic Thumbnail",
    description: "Dark navy/black background with neon purple and pink glow effects. Large glowing text: 'THE ALGORITHM SECRET'. Holographic/futuristic elements. Small text below: 'Nobody Talks About This'. Cinematic lighting on a shadowed face. Sci-fi inspired.",
    textOverlay: "THE ALGORITHM SECRET\nNobody Talks About This",
    colors: ["#0F172A", "#1a1a2e", "#e94560", "#38BDF8"],
    layout: "Centered text with glow effects",
  },
];

export default function ThumbnailsPage() {
  const { addNotification, consumeCredit } = useApp();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("bold-text");
  const [textOverlay, setTextOverlay] = useState("");
  const [generating, setGenerating] = useState(false);
  const [concepts, setConcepts] = useState<typeof SAMPLE_CONCEPTS>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addNotification({ id: Date.now().toString(), type: "warning", title: "Topic Required", message: "Enter a topic for thumbnail concepts." });
      return;
    }
    if (!consumeCredit()) {
      addNotification({ id: Date.now().toString(), type: "error", title: "No Credits", message: "Upgrade for more thumbnails." });
      return;
    }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setConcepts(SAMPLE_CONCEPTS);
    setGenerating(false);
    addNotification({ id: Date.now().toString(), type: "success", title: "Concepts Generated!", message: "4 thumbnail concepts ready for review." });
  };

  const handleCopy = async (text: string, index: number) => {
    await copyToClipboard(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader icon={ImageIcon} title="Thumbnail Generator" description="AI-powered thumbnail concepts with text overlay suggestions" />

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic / Video Title</label>
              <Input placeholder="e.g., 5 Rules of Audience Building" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {THUMBNAIL_STYLES.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Text Overlay (optional)</label>
              <Input placeholder="e.g., THE SECRET NOBODY TELLS YOU" value={textOverlay} onChange={(e) => setTextOverlay(e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="gradient" onClick={handleGenerate} disabled={generating}>
              {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4 mr-2" />Generate 4 Concepts</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
            <motion.div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <ImageIcon className="w-8 h-8 text-white" />
            </motion.div>
            <p className="font-display font-semibold">Designing Thumbnail Concepts</p>
            <p className="text-sm text-muted-foreground">Creating 4 unique concepts with DALL-E 3...</p>
          </motion.div>
        ) : concepts.length > 0 ? (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {concepts.map((concept, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="overflow-hidden card-hover">
                    {/* Thumbnail preview */}
                    <div className="aspect-video relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="flex gap-2 justify-center mb-3">
                          {concept.colors.map((color, ci) => (
                            <div key={ci} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="font-display font-bold text-lg text-foreground whitespace-pre-line">{concept.textOverlay}</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-md bg-black/50 text-white text-xs font-medium">Concept {i + 1}</span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold mb-2">{concept.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{concept.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Type className="w-3.5 h-3.5" />
                          <span className="font-medium">Text:</span>
                          <span>{concept.textOverlay.replace(/\n/g, " | ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Layout className="w-3.5 h-3.5" />
                          <span className="font-medium">Layout:</span>
                          <span>{concept.layout}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Palette className="w-3.5 h-3.5" />
                          <span className="font-medium">Colors:</span>
                          <div className="flex gap-1">
                            {concept.colors.map((c, ci) => (
                              <div key={ci} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleCopy(concept.description, i)}>
                          {copied === i ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />} Copy Brief
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-1" /> Generate Image
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={handleGenerate}><RefreshCw className="w-4 h-4 mr-2" /> Generate New Concepts</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Generate Thumbnail Concepts</h3>
            <p className="text-sm text-muted-foreground max-w-md">Enter your video topic and style to get 4 unique thumbnail concepts with color palettes, text overlays, and layout suggestions.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
