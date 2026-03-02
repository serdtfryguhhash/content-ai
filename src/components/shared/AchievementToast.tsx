"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Zap } from "lucide-react";

import { CreatorLevel } from "@/types";

interface Achievement {
  id: string;
  type: "xp" | "levelup";
  xp?: number;
  action?: string;
  level?: CreatorLevel;
}

// Singleton event emitter for achievements
const listeners: ((a: Achievement) => void)[] = [];

export function showAchievement(achievement: Achievement) {
  listeners.forEach((fn) => fn(achievement));
}

export default function AchievementToast() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const handler = (a: Achievement) => {
      setAchievements((prev) => [...prev, a]);
      setTimeout(() => {
        setAchievements((prev) => prev.filter((x) => x.id !== a.id));
      }, 3000);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2 max-w-xs">
      <AnimatePresence>
        {achievements.map((a) => {
          if (a.type === "levelup" && a.level) {
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="p-4 rounded-xl border shadow-lg bg-gradient-to-r from-primary to-secondary text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Level Up!</p>
                    <p className="text-xs text-white/80">
                      You are now a <span className="font-semibold">{a.level}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="p-3 rounded-xl border shadow-lg bg-white"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">+{a.xp} XP</p>
                  <p className="text-[10px] text-muted-foreground capitalize">
                    {a.action?.replace(/-/g, " ") || "Action completed"}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
