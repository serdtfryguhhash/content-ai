"use client";

import { CreatorLevel, GamificationData, XPAction } from "@/types";

const STORAGE_KEY = "creator_gamification";

const XP_VALUES: Record<string, number> = {
  "generate-content": 10,
  "publish-content": 25,
  "use-all-platforms": 50,
  "maintain-streak": 15,
  "share-card": 20,
  "create-template": 15,
  "repurpose-content": 20,
  "use-trend": 10,
  "save-to-library": 5,
  "brand-voice-setup": 30,
};

const LEVELS: { name: CreatorLevel; minXP: number; maxXP: number; color: string }[] = [
  { name: "Rookie", minXP: 0, maxXP: 199, color: "#94a3b8" },
  { name: "Creator", minXP: 200, maxXP: 599, color: "#3b82f6" },
  { name: "Influencer", minXP: 600, maxXP: 1499, color: "#8b5cf6" },
  { name: "Producer", minXP: 1500, maxXP: 3999, color: "#f59e0b" },
  { name: "Mogul", minXP: 4000, maxXP: Infinity, color: "#e94560" },
];

function getDefault(): GamificationData {
  return {
    totalXP: 0,
    level: "Rookie",
    actions: [],
    achievements: [],
  };
}

export function getGamification(): GamificationData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function save(data: GamificationData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function calculateLevel(xp: number): CreatorLevel {
  for (const level of LEVELS) {
    if (xp >= level.minXP && xp <= level.maxXP) {
      return level.name;
    }
  }
  return "Mogul";
}

export function getLevelInfo(level: CreatorLevel) {
  return LEVELS.find((l) => l.name === level) || LEVELS[0];
}

export function getLevelProgress(xp: number): { current: number; max: number; percentage: number } {
  const levelInfo = LEVELS.find((l) => xp >= l.minXP && xp <= l.maxXP) || LEVELS[LEVELS.length - 1];
  const current = xp - levelInfo.minXP;
  const max = levelInfo.maxXP === Infinity ? 1000 : levelInfo.maxXP - levelInfo.minXP + 1;
  const percentage = Math.min((current / max) * 100, 100);
  return { current, max, percentage };
}

export function awardXP(actionKey: string): { xpAwarded: number; newTotal: number; levelUp: boolean; newLevel: CreatorLevel } {
  const data = getGamification();
  const xp = XP_VALUES[actionKey] || 0;
  if (xp === 0) return { xpAwarded: 0, newTotal: data.totalXP, levelUp: false, newLevel: data.level };

  const oldLevel = data.level;
  data.totalXP += xp;
  data.level = calculateLevel(data.totalXP);

  const action: XPAction = {
    action: actionKey,
    xp,
    timestamp: new Date().toISOString(),
  };
  data.actions = [action, ...data.actions].slice(0, 100);

  const levelUp = data.level !== oldLevel;

  save(data);

  return {
    xpAwarded: xp,
    newTotal: data.totalXP,
    levelUp,
    newLevel: data.level,
  };
}

export function getTotalXP(): number {
  return getGamification().totalXP;
}

export function getLevel(): CreatorLevel {
  return getGamification().level;
}

export function getAllLevels() {
  return LEVELS;
}

export function getXPValues() {
  return XP_VALUES;
}
