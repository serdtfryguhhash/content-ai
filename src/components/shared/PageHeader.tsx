"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({ icon: Icon, title, description, children }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </motion.div>
  );
}
