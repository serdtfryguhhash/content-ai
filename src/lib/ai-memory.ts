"use client";

import { BrandVoice, Platform } from "@/types";

const STORAGE_KEY = "brand_voice_memory";

const DEFAULT_BRAND_VOICE: BrandVoice = {
  brandName: "",
  targetAudience: "",
  targetAge: "18-35",
  tone: "professional",
  niche: "",
  platforms: [],
  exampleContent: "",
  pastTopics: [],
  performanceNotes: "",
  createdAt: "",
  updatedAt: "",
};

export function getBrandVoice(): BrandVoice {
  if (typeof window === "undefined") return DEFAULT_BRAND_VOICE;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_BRAND_VOICE;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_BRAND_VOICE;
  }
}

export function saveBrandVoice(voice: BrandVoice): void {
  if (typeof window === "undefined") return;
  const now = new Date().toISOString();
  const updated: BrandVoice = {
    ...voice,
    updatedAt: now,
    createdAt: voice.createdAt || now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function hasBrandVoice(): boolean {
  if (typeof window === "undefined") return false;
  const voice = getBrandVoice();
  return voice.brandName !== "" && voice.niche !== "";
}

export function addPastTopic(topic: string): void {
  const voice = getBrandVoice();
  if (!voice.pastTopics.includes(topic)) {
    voice.pastTopics = [topic, ...voice.pastTopics].slice(0, 50);
    saveBrandVoice(voice);
  }
}

export function buildBrandContext(voice: BrandVoice): string {
  if (!voice.brandName) return "";

  const parts: string[] = [
    `Brand: ${voice.brandName}`,
    `Tone: ${voice.tone}`,
    `Target Audience: ${voice.targetAudience} (Age: ${voice.targetAge})`,
    `Niche: ${voice.niche}`,
  ];

  if (voice.platforms.length > 0) {
    parts.push(`Primary Platforms: ${voice.platforms.join(", ")}`);
  }

  if (voice.exampleContent) {
    parts.push(`Brand Voice Example: "${voice.exampleContent}"`);
  }

  if (voice.pastTopics.length > 0) {
    parts.push(`Recent Topics: ${voice.pastTopics.slice(0, 10).join(", ")}`);
  }

  if (voice.performanceNotes) {
    parts.push(`Performance Notes: ${voice.performanceNotes}`);
  }

  return parts.join("\n");
}

export function getBrandVoicePlatforms(): Platform[] {
  const voice = getBrandVoice();
  return voice.platforms;
}
