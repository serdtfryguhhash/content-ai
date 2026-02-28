"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles, FileText, Calendar, Image, LayoutGrid,
  BarChart3, Settings, Gift, ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

const SIDEBAR_ITEMS = [
  { href: "/studio", label: "AI Studio", icon: Sparkles, gradient: true },
  { href: "/hooks", label: "Hook Generator", icon: Zap },
  { href: "/scripts", label: "Script Writer", icon: FileText },
  { href: "/calendar", label: "Content Calendar", icon: Calendar },
  { href: "/thumbnails", label: "Thumbnails", icon: Image },
  { href: "/templates", label: "Templates", icon: LayoutGrid },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/referrals", label: "Referrals", icon: Gift },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, credits } = useApp();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 72 }}
      className="sticky top-16 h-[calc(100vh-4rem)] bg-white border-r flex flex-col overflow-hidden z-40"
    >
      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-6 z-50 w-6 h-6 bg-white border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </button>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? item.gradient
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive && !item.gradient && "text-primary")} />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && !item.gradient && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      {sidebarOpen && (
        <div className="p-4 border-t">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Credits</span>
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">{credits}</div>
            <p className="text-xs text-muted-foreground mb-3">
              of 50 monthly credits used
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${((50 - credits) / 50) * 100}%` }}
              />
            </div>
            <Link href="/pricing">
              <button className="w-full text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                Upgrade for unlimited
              </button>
            </Link>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
