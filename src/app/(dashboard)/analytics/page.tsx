"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Eye, Heart, MessageSquare, Share2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { formatNumber, getPlatformColor, getPlatformIcon } from "@/lib/utils";

const STATS = [
  { label: "Total Views", value: 2456789, change: 23.5, icon: Eye, color: "text-blue-500" },
  { label: "Total Likes", value: 189432, change: 15.2, icon: Heart, color: "text-red-500" },
  { label: "Comments", value: 34521, change: 8.7, icon: MessageSquare, color: "text-green-500" },
  { label: "Shares", value: 12345, change: -3.2, icon: Share2, color: "text-secondary" },
];

const PLATFORM_DATA = [
  { platform: "youtube", views: 1234567, engagement: 4.2, content: 24, growth: 18.5 },
  { platform: "tiktok", views: 567890, engagement: 8.7, content: 45, growth: 34.2 },
  { platform: "instagram", views: 345678, engagement: 5.1, content: 38, growth: 12.1 },
  { platform: "twitter", views: 198765, engagement: 3.8, content: 62, growth: 7.3 },
  { platform: "linkedin", views: 87654, engagement: 6.2, content: 15, growth: 22.8 },
  { platform: "newsletter", views: 22235, engagement: 41.0, content: 12, growth: 15.5 },
];

const TOP_CONTENT = [
  { title: "5 AI Tools Every Creator Needs", platform: "youtube", views: 456789, engagement: 5.8 },
  { title: "Morning Routine that Changed My Life", platform: "tiktok", views: 234567, engagement: 12.3 },
  { title: "Creator Economy 2026 Predictions", platform: "twitter", views: 123456, engagement: 4.1 },
  { title: "How I Built a 6-Figure Content Business", platform: "linkedin", views: 98765, engagement: 7.2 },
  { title: "Behind the Scenes of My Content Process", platform: "instagram", views: 87654, engagement: 6.5 },
];

const WEEKLY_DATA = [
  { day: "Mon", views: 45000, engagement: 3200 },
  { day: "Tue", views: 52000, engagement: 4100 },
  { day: "Wed", views: 48000, engagement: 3800 },
  { day: "Thu", views: 61000, engagement: 5200 },
  { day: "Fri", views: 55000, engagement: 4600 },
  { day: "Sat", views: 38000, engagement: 2900 },
  { day: "Sun", views: 42000, engagement: 3100 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const maxViews = Math.max(...WEEKLY_DATA.map((d) => d.views));

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader icon={BarChart3} title="Content Analytics" description="Track performance across all your platforms">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="card-hover">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <div className={`flex items-center gap-1 text-xs font-medium ${stat.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {stat.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(stat.change)}%
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold">{formatNumber(stat.value)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48">
              {WEEKLY_DATA.map((day, i) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1 items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.views / maxViews) * 140}px` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-primary to-primary/60"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.engagement / maxViews) * 140}px` }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-secondary to-secondary/60"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Views</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded bg-secondary" />
                <span className="text-muted-foreground">Engagement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {PLATFORM_DATA.map((pd) => (
                <div key={pd.platform} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${getPlatformColor(pd.platform)}15` }}>
                    {getPlatformIcon(pd.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{pd.platform}</span>
                      <span className="text-xs text-green-600">+{pd.growth}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${(pd.views / PLATFORM_DATA[0].views) * 100}%`, backgroundColor: getPlatformColor(pd.platform) }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">{formatNumber(pd.views)} views</span>
                      <span className="text-[10px] text-muted-foreground">{pd.engagement}% eng.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TOP_CONTENT.map((content, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">
                  #{i + 1}
                </span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${getPlatformColor(content.platform)}15` }}>
                  {getPlatformIcon(content.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{content.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{content.platform}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatNumber(content.views)}</p>
                  <p className="text-xs text-muted-foreground">{content.engagement}% engagement</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
