"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const COLORS = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
};

export default function NotificationToast() {
  const { notifications, dismissNotification } = useApp();

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = ICONS[notification.type];
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              className={`p-4 rounded-xl border shadow-lg ${COLORS[notification.type]} flex items-start gap-3`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-xs mt-0.5 opacity-80">{notification.message}</p>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
