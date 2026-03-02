"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGamification } from "@/lib/gamification";
import { getLibraryStats } from "@/lib/library";
import { getStats } from "@/lib/engagement";
import { copyToClipboard } from "@/lib/utils";
import { awardXP } from "@/lib/gamification";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/lib/constants";

export default function ShareCard() {
  const { user, addNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalContent: 0,
    platforms: 0,
    streak: 0,
    level: "Rookie",
    xp: 0,
    byPlatform: {} as Record<string, number>,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gamification = getGamification();
    const libraryStats = getLibraryStats();
    const engagement = getStats();

    setStats({
      totalContent: libraryStats.total,
      platforms: Object.keys(libraryStats.byPlatform).length,
      streak: engagement.currentStreak,
      level: gamification.level,
      xp: gamification.totalXP,
      byPlatform: libraryStats.byPlatform,
    });
  }, []);

  const shareText = `I've created ${stats.totalContent} pieces of content across ${stats.platforms} platforms on Content AI! Currently on a ${stats.streak}-day streak as a ${stats.level} level creator. #ContentAI #CreatorEconomy`;

  const handleCopy = async () => {
    await copyToClipboard(shareText);
    setCopied(true);
    awardXP("share-card");
    addNotification({
      id: Date.now().toString(),
      type: "success",
      title: "Copied!",
      message: "Share card text copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate a simple text-based share card
    const content = `
========================================
    CONTENT AI - CREATOR STATS
========================================

  ${user?.full_name || "Creator"}
  Level: ${stats.level} (${stats.xp} XP)
  
  ${stats.totalContent} Content Pieces Created
  ${stats.platforms} Platforms Used
  ${stats.streak}-Day Streak

  Platform Breakdown:
${Object.entries(stats.byPlatform)
  .map(([p, count]) => `    ${p}: ${count} pieces`)
  .join("\n")}

========================================
  Powered by Content AI
========================================
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "creator-stats.txt";
    a.click();
    URL.revokeObjectURL(url);

    awardXP("share-card");
  };

  const topPlatforms = Object.entries(stats.byPlatform)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);
  const maxPlatformCount = topPlatforms.length > 0 ? topPlatforms[0][1] : 1;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Share2 className="w-5 h-5 text-secondary" />
          Creator Stats Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Visual card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 text-white mb-4"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-display font-bold">Content.ai</span>
            </div>

            <p className="font-display text-2xl font-bold mb-1">
              {user?.full_name || "Creator"}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/20 text-white text-[10px]">{stats.level}</Badge>
              <span className="text-xs text-white/70">{stats.xp} XP</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold">{stats.totalContent}</p>
                <p className="text-[10px] text-white/60">Content</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.platforms}</p>
                <p className="text-[10px] text-white/60">Platforms</p>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold">{stats.streak}</p>
                  <p className="text-[10px] text-white/60">Streak</p>
                </div>
              </div>
            </div>

            {/* Mini bar chart */}
            {topPlatforms.length > 0 && (
              <div className="space-y-1.5">
                {topPlatforms.map(([platform, count]) => {
                  const pInfo = PLATFORMS.find((p) => p.value === platform);
                  return (
                    <div key={platform} className="flex items-center gap-2">
                      <span className="text-xs w-6">{pInfo?.icon || "📝"}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-white/40"
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / maxPlatformCount) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-[10px] text-white/60 w-4">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? "Copied!" : "Copy Text"}
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
