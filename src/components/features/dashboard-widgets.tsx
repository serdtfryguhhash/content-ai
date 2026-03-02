"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TrendSpotter from "@/components/features/trend-spotter";
import WeeklyReport from "@/components/features/weekly-report";
import ConsistencyScore from "@/components/features/consistency-score";
import ShareCard from "@/components/shared/ShareCard";

export default function DashboardWidgets() {
  const router = useRouter();

  const handleCreateContent = (topic: string, platform: string) => {
    // Navigate to studio with pre-filled topic
    router.push(`/studio?topic=${encodeURIComponent(topic)}&platform=${encodeURIComponent(platform)}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrendSpotter onCreateContent={handleCreateContent} />
      <WeeklyReport />
      <ConsistencyScore />
      <ShareCard />
    </div>
  );
}
