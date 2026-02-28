"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User, ContentPackage, CalendarEntry } from "@/types";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  contentPackages: ContentPackage[];
  addContentPackage: (pkg: ContentPackage) => void;
  calendarEntries: CalendarEntry[];
  setCalendarEntries: (entries: CalendarEntry[]) => void;
  addCalendarEntry: (entry: CalendarEntry) => void;
  updateCalendarEntry: (id: string, data: Partial<CalendarEntry>) => void;
  removeCalendarEntry: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  credits: number;
  consumeCredit: () => boolean;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  dismissNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: "demo-user-1",
  email: "creator@contentai.studio",
  full_name: "Alex Creator",
  avatar_url: null,
  subscription_tier: "creator",
  stripe_customer_id: null,
  stripe_subscription_id: null,
  referral_code: "CAI-ALEX42",
  referred_by: null,
  content_credits: 47,
  created_at: "2024-01-15",
  updated_at: "2024-03-20",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [contentPackages, setContentPackages] = useState<ContentPackage[]>([]);
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([
    {
      id: "cal-1",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "Morning Routine Reel",
      description: "Share my 5AM morning routine with productivity tips",
      platform: "instagram",
      scheduled_date: "2026-03-02",
      scheduled_time: "09:00",
      status: "scheduled",
      color: "#E4405F",
      ai_suggested_time: "08:30",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
    {
      id: "cal-2",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "AI Tools Review Video",
      description: "Top 10 AI tools for content creators in 2026",
      platform: "youtube",
      scheduled_date: "2026-03-03",
      scheduled_time: "14:00",
      status: "draft",
      color: "#FF0000",
      ai_suggested_time: "15:00",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
    {
      id: "cal-3",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "Creator Economy Thread",
      description: "Thread on how the creator economy is evolving",
      platform: "twitter",
      scheduled_date: "2026-03-04",
      scheduled_time: "12:00",
      status: "scheduled",
      color: "#1DA1F2",
      ai_suggested_time: "12:30",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
    {
      id: "cal-4",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "Business Tips Carousel",
      description: "7 business lessons I learned this month",
      platform: "linkedin",
      scheduled_date: "2026-03-05",
      scheduled_time: "10:00",
      status: "draft",
      color: "#0077B5",
      ai_suggested_time: "09:00",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
    {
      id: "cal-5",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "Day in My Life TikTok",
      description: "Behind the scenes of running a content business",
      platform: "tiktok",
      scheduled_date: "2026-03-06",
      scheduled_time: "18:00",
      status: "scheduled",
      color: "#000000",
      ai_suggested_time: "19:00",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
    {
      id: "cal-6",
      user_id: "demo-user-1",
      content_package_id: null,
      title: "Weekly Newsletter",
      description: "Issue #47: The future of content creation",
      platform: "newsletter",
      scheduled_date: "2026-03-07",
      scheduled_time: "07:00",
      status: "draft",
      color: "#F39C12",
      ai_suggested_time: "07:30",
      created_at: "2024-03-15",
      updated_at: "2024-03-15",
    },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [credits, setCredits] = useState(47);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const isAuthenticated = user !== null;

  const addContentPackage = useCallback((pkg: ContentPackage) => {
    setContentPackages((prev) => [pkg, ...prev]);
  }, []);

  const addCalendarEntry = useCallback((entry: CalendarEntry) => {
    setCalendarEntries((prev) => [...prev, entry]);
  }, []);

  const updateCalendarEntry = useCallback((id: string, data: Partial<CalendarEntry>) => {
    setCalendarEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...data } : entry))
    );
  }, []);

  const removeCalendarEntry = useCallback((id: string) => {
    setCalendarEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const consumeCredit = useCallback(() => {
    if (credits <= 0) return false;
    setCredits((prev) => prev - 1);
    return true;
  }, [credits]);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        contentPackages,
        addContentPackage,
        calendarEntries,
        setCalendarEntries,
        addCalendarEntry,
        updateCalendarEntry,
        removeCalendarEntry,
        sidebarOpen,
        setSidebarOpen,
        credits,
        consumeCredit,
        notifications,
        addNotification,
        dismissNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
