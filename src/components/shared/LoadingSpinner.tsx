"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", text }: { size?: "sm" | "md" | "lg"; text?: string }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-muted border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
