"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import DashboardWidgets from "@/components/features/dashboard-widgets";
import { useApp } from "@/context/AppContext";
import { getTimeOfDay } from "@/lib/utils";

export default function DashboardPage() {
  const { user, credits } = useApp();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        icon={Home}
        title={`Good ${getTimeOfDay()}, ${user?.full_name?.split(" ")[0] || "Creator"}`}
        description="Here is your content creation dashboard"
      />

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/studio">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="card-hover cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Create Content</p>
                  <p className="text-xs text-muted-foreground">{credits} credits left</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </motion.div>
        </Link>
        <Link href="/library">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="card-hover cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <span className="text-lg">📚</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Content Library</p>
                  <p className="text-xs text-muted-foreground">Browse saved content</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </motion.div>
        </Link>
        <Link href="/analytics">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="card-hover cursor-pointer group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <span className="text-lg">📊</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">View Analytics</p>
                  <p className="text-xs text-muted-foreground">Track performance</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      </div>

      {/* Dashboard Widgets */}
      <DashboardWidgets />
    </div>
  );
}
