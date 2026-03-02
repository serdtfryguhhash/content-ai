"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getGamification, getLevelProgress, getLevelInfo, getAllLevels } from "@/lib/gamification";
import { CreatorLevel } from "@/types";

export default function XPBar() {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState<CreatorLevel>("Rookie");
  const [progress, setProgress] = useState({ current: 0, max: 200, percentage: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const data = getGamification();
    setXP(data.totalXP);
    setLevel(data.level);
    setProgress(getLevelProgress(data.totalXP));

    // Poll for changes every 2 seconds
    const interval = setInterval(() => {
      const updated = getGamification();
      if (updated.totalXP !== xp) {
        setXP(updated.totalXP);
        setLevel(updated.level);
        setProgress(getLevelProgress(updated.totalXP));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [xp]);

  const levelInfo = getLevelInfo(level);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 cursor-pointer">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: levelInfo.color + "20" }}
        >
          <Star className="w-3 h-3" style={{ color: levelInfo.color }} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold" style={{ color: levelInfo.color }}>
            {level}
          </span>
          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: levelInfo.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{xp} XP</span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-3 bg-gray-900 text-white rounded-xl shadow-lg z-50"
        >
          <div className="text-center mb-2">
            <p className="font-semibold text-sm">{level}</p>
            <p className="text-[10px] text-gray-400">{xp} / {progress.max + getLevelInfo(level).minXP} XP</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${progress.percentage}%`, backgroundColor: levelInfo.color }}
            />
          </div>
          <div className="space-y-1">
            {getAllLevels().map((l) => (
              <div key={l.name} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className={l.name === level ? "text-white font-medium" : "text-gray-400"}>
                    {l.name}
                  </span>
                </div>
                <span className="text-gray-500">{l.minXP}+ XP</span>
              </div>
            ))}
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
