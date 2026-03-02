"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Zap, Lightbulb, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentPrediction } from "@/types";

interface ContentScoreProps {
  content: string;
  platform: string;
  contentType?: string;
}

export default function ContentScore({ content, platform, contentType }: ContentScoreProps) {
  const [prediction, setPrediction] = useState<ContentPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, platform, contentType }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPrediction(data.data);
      } else {
        setError(data.error || "Failed to predict performance");
      }
    } catch {
      setError("Failed to connect to prediction engine");
    }
    setLoading(false);
  };

  useEffect(() => {
    setPrediction(null);
    setError(null);
  }, [content, platform]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 8) return "from-green-500 to-emerald-500";
    if (score >= 5) return "from-amber-500 to-yellow-500";
    return "from-red-500 to-orange-500";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            Performance Predictor
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPrediction}
            disabled={loading || !content.trim()}
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
              <Zap className="w-3 h-3 mr-1" />
            )}
            {prediction ? "Re-Analyze" : "Analyze"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 mb-3">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center py-8 gap-3">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-muted border-t-secondary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground">Analyzing content performance...</p>
          </div>
        )}

        {!loading && !prediction && !error && (
          <div className="text-center py-6">
            <TrendingUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Generate content above, then click Analyze to predict performance
            </p>
          </div>
        )}

        {prediction && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Gauge */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="currentColor"
                    className="text-muted"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 34 * (1 - prediction.engagementScore / 10),
                    }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as const }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e94560" />
                      <stop offset="100%" stopColor="#f5a623" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className={`text-xl font-bold ${getScoreColor(prediction.engagementScore)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {prediction.engagementScore}
                  </motion.span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Virality</span>
                  <span className="font-semibold">{prediction.viralityPotential}/10</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(prediction.viralityPotential)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.viralityPotential * 10}%` }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Best time: {prediction.bestPostingTime}
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-primary/5 rounded-lg p-3">
              <p className="text-sm">{prediction.overallVerdict}</p>
            </div>

            {/* Strengths */}
            {prediction.strengths.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-600 mb-1">Strengths</p>
                <div className="flex flex-wrap gap-1">
                  {prediction.strengths.map((s, i) => (
                    <Badge key={i} variant="outline" className="text-green-600 border-green-200 text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {prediction.improvements.length > 0 && (
              <div>
                <p className="text-xs font-medium text-amber-600 mb-1">Improvements</p>
                <div className="space-y-1">
                  {prediction.improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      {imp}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
