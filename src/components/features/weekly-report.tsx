"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileBarChart, RefreshCw, Loader2, TrendingUp, TrendingDown, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLibraryItems } from "@/lib/library";
import { getGamification } from "@/lib/gamification";
import { getBrandVoice } from "@/lib/ai-memory";
import { WeeklyReport as WeeklyReportType } from "@/types";

export default function WeeklyReport() {
  const [report, setReport] = useState<WeeklyReportType | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const items = getLibraryItems();
      const gamification = getGamification();
      const voice = getBrandVoice();

      const oneWeekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const weekItems = items.filter((i) => i.createdAt >= oneWeekAgo);
      const platformsCovered = Array.from(new Set(weekItems.map((i) => i.platform)));

      const res = await fetch("/api/ai/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentCreated: weekItems.length,
          platformsCovered,
          consistencyScore: Math.min(weekItems.length * 10, 100),
          xpEarned: gamification.totalXP,
          niche: voice.niche || "general",
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setReport(data.data);
      }
    } catch {
      // Silently fail - report section will show generate button
    }
    setLoading(false);
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-primary" />
            Weekly Report
          </span>
          <Button variant="outline" size="sm" onClick={generateReport} disabled={loading}>
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && !report && (
          <div className="flex flex-col items-center py-6 gap-3">
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-muted border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground">Generating your weekly report...</p>
          </div>
        )}

        {report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Week header */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {report.weekOf}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-primary/5">
                <p className="text-xl font-bold">{report.contentCreated}</p>
                <p className="text-[10px] text-muted-foreground">Content Created</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/5">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-xl font-bold">{report.consistencyScore}</p>
                  {report.consistencyChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">Consistency</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-accent/5">
                <p className="text-xl font-bold">{report.xpEarned}</p>
                <p className="text-[10px] text-muted-foreground">XP Earned</p>
              </div>
            </div>

            {/* Platforms */}
            {report.platformsCovered.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-1">Platforms Covered</p>
                <div className="flex flex-wrap gap-1">
                  {report.platformsCovered.map((p) => (
                    <Badge key={p} variant="outline" className="text-[10px] capitalize">{p}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {report.highlights.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-600 mb-1">Highlights</p>
                <div className="space-y-1">
                  {report.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Sparkles className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations.length > 0 && (
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">Recommendations</p>
                <div className="space-y-1">
                  {report.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!report && !loading && (
          <div className="text-center py-6">
            <FileBarChart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No report generated yet</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={generateReport}>
              Generate Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
