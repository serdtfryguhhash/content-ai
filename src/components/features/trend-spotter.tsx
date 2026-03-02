"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPlatformColor, getPlatformIcon } from "@/lib/utils";
import { getBrandVoice } from "@/lib/ai-memory";
import { TrendIdea } from "@/types";

interface TrendSpotterProps {
  onCreateContent?: (topic: string, platform: string) => void;
}

export default function TrendSpotter({ onCreateContent }: TrendSpotterProps) {
  const [trends, setTrends] = useState<TrendIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const voice = getBrandVoice();
      const res = await fetch("/api/ai/trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: voice.niche || "general content creation",
          platforms: voice.platforms.length > 0 ? voice.platforms : undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTrends(data.data);
        setLastRefresh(new Date().toLocaleTimeString());
      }
    } catch {
      // Use empty state - trends will show placeholder
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Trending Now
          </span>
          <div className="flex items-center gap-2">
            {lastRefresh && (
              <span className="text-[10px] text-muted-foreground">Updated {lastRefresh}</span>
            )}
            <Button variant="outline" size="sm" onClick={fetchTrends} disabled={loading}>
              {loading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && trends.length === 0 && (
          <div className="flex flex-col items-center py-8 gap-3">
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-muted border-t-secondary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground">Discovering trends...</p>
          </div>
        )}

        <div className="space-y-3">
          {trends.map((trend, i) => (
            <motion.div
              key={trend.id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as const }}
              className="group p-4 rounded-xl border hover:border-secondary/30 hover:bg-secondary/5 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{ backgroundColor: `${getPlatformColor(trend.platform)}15` }}
                >
                  {getPlatformIcon(trend.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{trend.title}</h4>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 ${
                        trend.trendScore >= 8 ? "text-green-600 border-green-200" : "text-amber-600 border-amber-200"
                      }`}
                    >
                      {trend.trendScore}/10
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {trend.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {trend.hashtags.slice(0, 3).map((tag, j) => (
                      <span key={j} className="text-[10px] text-secondary">{tag}</span>
                    ))}
                  </div>
                </div>
                {onCreateContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onCreateContent(trend.title, trend.platform)}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Create
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {trends.length === 0 && !loading && (
          <div className="text-center py-6">
            <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No trends loaded yet</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchTrends}>
              <RefreshCw className="w-3 h-3 mr-1" /> Load Trends
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
