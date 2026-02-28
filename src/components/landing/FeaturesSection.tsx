"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, FileText, Calendar, Image, LayoutGrid,
  BarChart3, ArrowRight,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Content Studio",
    description: "Generate complete content packages — hooks, scripts, captions, hashtags, B-roll lists, and thumbnail concepts — all from a single topic.",
    color: "from-primary to-primary-600",
    href: "/studio",
  },
  {
    icon: Zap,
    title: "Hook Generator",
    description: "Create 20 scroll-stopping hooks in 5 proven styles: Controversial, Curiosity, Story, Stat, and Question. Never start from scratch again.",
    color: "from-secondary to-secondary-600",
    href: "/hooks",
  },
  {
    icon: FileText,
    title: "Script Writer",
    description: "Write full video scripts with AI-powered outlines, section-by-section generation, and a built-in teleprompter mode for recording.",
    color: "from-accent to-accent-600",
    href: "/scripts",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description: "Drag-and-drop calendar with AI-powered posting time suggestions, color-coded by platform, and automated scheduling workflows.",
    color: "from-primary-500 to-primary-400",
    href: "/calendar",
  },
  {
    icon: Image,
    title: "Thumbnail Generator",
    description: "DALL-E 3 powered thumbnail concepts with text overlay suggestions and A/B testing recommendations for maximum click-through rates.",
    color: "from-secondary-400 to-accent-500",
    href: "/thumbnails",
  },
  {
    icon: LayoutGrid,
    title: "Template Library",
    description: "Access 50+ battle-tested templates for every platform and niche. From viral TikTok scripts to LinkedIn thought leadership posts.",
    color: "from-accent-500 to-secondary-400",
    href: "/templates",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          >
            <BarChart3 className="w-4 h-4" />
            Everything You Need
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Your Complete{" "}
            <span className="gradient-text">Content Production</span>
            {" "}Studio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Stop juggling 10 different tools. Content.ai gives you everything you need to ideate, 
            create, schedule, and analyze your content — all in one place.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Link href={feature.href}>
                  <div className="group bg-white border rounded-2xl p-6 card-hover cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Try it now <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
