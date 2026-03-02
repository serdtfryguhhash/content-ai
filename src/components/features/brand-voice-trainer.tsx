"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBrandVoice, saveBrandVoice, hasBrandVoice } from "@/lib/ai-memory";
import { awardXP } from "@/lib/gamification";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/lib/constants";
import { BrandTone, Platform } from "@/types";

const TONES: { value: BrandTone; label: string; description: string; emoji: string }[] = [
  { value: "casual", label: "Casual", description: "Relaxed, friendly, conversational", emoji: "😎" },
  { value: "professional", label: "Professional", description: "Polished, authoritative, trustworthy", emoji: "💼" },
  { value: "edgy", label: "Edgy", description: "Bold, provocative, boundary-pushing", emoji: "🔥" },
  { value: "inspirational", label: "Inspirational", description: "Uplifting, motivating, empowering", emoji: "✨" },
  { value: "educational", label: "Educational", description: "Informative, clear, structured", emoji: "📚" },
  { value: "humorous", label: "Humorous", description: "Witty, entertaining, fun", emoji: "😂" },
];

const AGE_RANGES = ["13-17", "18-24", "25-34", "35-44", "45-54", "55+"];

const STEPS = ["Brand Info", "Voice & Tone", "Audience", "Platforms", "Review"];

export default function BrandVoiceTrainer({ onComplete }: { onComplete?: () => void }) {
  const { addNotification } = useApp();
  const [step, setStep] = useState(0);
  const [brandName, setBrandName] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState<BrandTone>("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [targetAge, setTargetAge] = useState("18-24");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [exampleContent, setExampleContent] = useState("");
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    if (hasBrandVoice()) {
      const voice = getBrandVoice();
      setBrandName(voice.brandName);
      setNiche(voice.niche);
      setTone(voice.tone);
      setTargetAudience(voice.targetAudience);
      setTargetAge(voice.targetAge);
      setPlatforms(voice.platforms);
      setExampleContent(voice.exampleContent);
      setIsSetup(true);
    }
  }, []);

  const togglePlatform = (p: Platform) => {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSave = () => {
    saveBrandVoice({
      brandName,
      targetAudience,
      targetAge,
      tone,
      niche,
      platforms,
      exampleContent,
      pastTopics: getBrandVoice().pastTopics,
      performanceNotes: getBrandVoice().performanceNotes,
      createdAt: getBrandVoice().createdAt,
      updatedAt: "",
    });

    if (!isSetup) {
      awardXP("brand-voice-setup");
    }

    addNotification({
      id: Date.now().toString(),
      type: "success",
      title: "Brand Voice Saved",
      message: "Your brand voice preferences have been saved. All AI generations will use these settings.",
    });

    setIsSetup(true);
    onComplete?.();
  };

  const canProceed = () => {
    switch (step) {
      case 0: return brandName.trim() !== "" && niche.trim() !== "";
      case 1: return true;
      case 2: return targetAudience.trim() !== "";
      case 3: return platforms.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mic className="w-5 h-5 text-secondary" />
          Brand Voice Trainer
          {isSetup && (
            <Badge variant="outline" className="text-green-600 border-green-200 ml-2">
              <Check className="w-3 h-3 mr-1" /> Configured
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => i <= step && setStep(i)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                  i === step
                    ? "gradient-bg text-white"
                    : i < step
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="w-3 h-3 inline" /> : null} {s}
              </button>
              {i < STEPS.length - 1 && (
                <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand / Creator Name</label>
                  <Input
                    placeholder="e.g., Alex Creates, TechVision Studio"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Niche / Industry</label>
                  <Input
                    placeholder="e.g., Tech & SaaS, Fitness, Personal Finance"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Your Brand Tone</label>
                <div className="grid grid-cols-2 gap-3">
                  {TONES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        tone === t.value
                          ? "border-secondary bg-secondary/5 ring-2 ring-secondary/20"
                          : "hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{t.emoji}</span>
                      <p className="font-medium text-sm">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.description}</p>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Example Content (optional)</label>
                  <Textarea
                    placeholder="Paste a sample of your best content so AI can learn your style..."
                    value={exampleContent}
                    onChange={(e) => setExampleContent(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Describe Your Target Audience</label>
                  <Textarea
                    placeholder="e.g., Aspiring content creators who want to grow their audience and monetize their passion"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Age Range</label>
                  <div className="flex flex-wrap gap-2">
                    {AGE_RANGES.map((age) => (
                      <button
                        key={age}
                        onClick={() => setTargetAge(age)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          targetAge === age
                            ? "gradient-bg text-white"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Your Primary Platforms</label>
                <div className="grid grid-cols-2 gap-3">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => togglePlatform(p.value)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        platforms.includes(p.value)
                          ? "border-secondary bg-secondary/5"
                          : "hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm font-medium">{p.label}</span>
                      {platforms.includes(p.value) && (
                        <Check className="w-4 h-4 text-secondary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 space-y-3">
                  <h3 className="font-display font-semibold">Brand Voice Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Brand:</span>
                      <p className="font-medium">{brandName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Niche:</span>
                      <p className="font-medium">{niche}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tone:</span>
                      <p className="font-medium capitalize">{tone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Age:</span>
                      <p className="font-medium">{targetAge}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Audience:</span>
                    <p className="font-medium">{targetAudience}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Platforms:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {platforms.map((p) => (
                        <Badge key={p} variant="outline" className="capitalize">{p}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              variant="gradient"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button variant="gradient" onClick={handleSave}>
              <Sparkles className="w-4 h-4 mr-1" /> Save Brand Voice
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
