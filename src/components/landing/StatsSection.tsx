"use client";

import React from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="py-16 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
