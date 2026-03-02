"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Flame, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats } from "@/lib/engagement";
import { getLibraryItems } from "@/lib/library";

interface DayData {
  date: string;
  count: number;
}

export default function ConsistencyScore() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalContent, setTotalContent] = useState(0);
  const [heatmapData, setHeatmapData] = useState<DayData[]>([]);
  const [weeklyOutput, setWeeklyOutput] = useState(0);
  const [monthlyOutput, setMonthlyOutput] = useState(0);

  useEffect(() => {
    const stats = getStats();
    const items = getLibraryItems();

    setStreak(stats.currentStreak);
    setTotalContent(items.length);

    // Build heatmap from library items (last 12 weeks)
    const now = new Date();
    const dayMap: Record<string, number> = {};

    // Initialize 84 days (12 weeks)
    for (let i = 0; i < 84; i++) {
      const d = new Date(now.getTime() - i * 86400000);
      const key = d.toISOString().split("T")[0];
      dayMap[key] = 0;
    }

    // Count items by date
    for (const item of items) {
      const key = item.createdAt.split("T")[0];
      if (key in dayMap) {
        dayMap[key]++;
      }
    }

    const heatData = Object.entries(dayMap)
      .map(([date, count]) => ({ date, count }))
      .reverse();

    setHeatmapData(heatData);

    // Calculate weekly/monthly output
    const oneWeekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
    const oneMonthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();

    const weekly = items.filter((i) => i.createdAt >= oneWeekAgo).length;
    const monthly = items.filter((i) => i.createdAt >= oneMonthAgo).length;

    setWeeklyOutput(weekly);
    setMonthlyOutput(monthly);

    // Calculate consistency score (0-100)
    const streakScore = Math.min(stats.currentStreak * 5, 30);
    const outputScore = Math.min(monthly * 3, 40);
    const regularityScore = Math.min(weekly * 5, 30);
    const calculated = Math.min(streakScore + outputScore + regularityScore, 100);
    setScore(calculated);
  }, []);

  const getHeatColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-400";
    if (count === 3) return "bg-green-500";
    return "bg-green-600";
  };

  // Group heatmap data into weeks (7 days each)
  const weeks: DayData[][] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          Consistency Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-6">
          {/* Score ring */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="currentColor"
                className="text-muted"
                strokeWidth="8"
              />
              <motion.circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="url(#consistencyGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 40 * (1 - score / 100),
                }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] as const }}
              />
              <defs>
                <linearGradient id="consistencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-2xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {score}
              </motion.span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded-lg bg-orange-50">
              <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{streak}</p>
              <p className="text-[10px] text-muted-foreground">Day Streak</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-50">
              <Calendar className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{totalContent}</p>
              <p className="text-[10px] text-muted-foreground">Total Content</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-purple-50">
              <TrendingUp className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{weeklyOutput}</p>
              <p className="text-[10px] text-muted-foreground">This Week</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-50">
              <Activity className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{monthlyOutput}</p>
              <p className="text-[10px] text-muted-foreground">This Month</p>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Content Activity (Last 12 Weeks)</p>
          <div className="flex gap-[3px] overflow-x-auto pb-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: wi * 0.02 }}
                    className={`w-3 h-3 rounded-[2px] ${getHeatColor(day.count)}`}
                    title={`${day.date}: ${day.count} items`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-[2px]">
              {["bg-muted", "bg-green-200", "bg-green-400", "bg-green-500", "bg-green-600"].map((c) => (
                <div key={c} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
