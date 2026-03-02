"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Hash, Clock, Tag, FileText, Monitor, Smartphone } from "lucide-react";

interface BeforeAfterCard {
  id: number;
  title: string;
  before: {
    label: string;
    text: string;
  };
  after: {
    label: string;
    sections: {
      icon: React.ReactNode;
      badge?: string;
      badgeColor?: string;
      title: string;
      content: string;
    }[];
  };
}

const CARDS: BeforeAfterCard[] = [
  {
    id: 1,
    title: "Rough Idea to Full Script",
    before: {
      label: "Your rough idea",
      text: "Want to talk about productivity tips",
    },
    after: {
      label: "Content AI Output",
      sections: [
        {
          icon: <Sparkles className="w-3.5 h-3.5" />,
          badge: "Hook",
          badgeColor: "bg-secondary/10 text-secondary",
          title: "Scroll-Stopping Hook",
          content: "\"You're losing 3 hours every day and you don't even know it. Here's the productivity system that changed everything...\"",
        },
        {
          icon: <FileText className="w-3.5 h-3.5" />,
          badge: "Script",
          badgeColor: "bg-primary/10 text-primary",
          title: "Full Video Script",
          content: "Intro + 5 key points + personal story + actionable takeaway + CTA (847 words, ~5min video)",
        },
        {
          icon: <Hash className="w-3.5 h-3.5" />,
          badge: "SEO",
          badgeColor: "bg-accent/10 text-accent",
          title: "Hashtags & Thumbnail",
          content: "#productivity #timemanagement #success + 3 thumbnail concepts with text overlays",
        },
      ],
    },
  },
  {
    id: 2,
    title: "One Idea, 5 Platforms",
    before: {
      label: "Your rough idea",
      text: "My morning routine",
    },
    after: {
      label: "Content AI Output",
      sections: [
        {
          icon: <Smartphone className="w-3.5 h-3.5" />,
          badge: "TikTok",
          badgeColor: "bg-black/10 text-black",
          title: "60s Vertical Script",
          content: "Fast-paced hook + 5 routine steps with transitions + trending sound suggestion",
        },
        {
          icon: <Monitor className="w-3.5 h-3.5" />,
          badge: "YouTube",
          badgeColor: "bg-red-100 text-red-600",
          title: "10min Long-Form",
          content: "Full vlog script with B-roll list, timestamps, and end-screen CTA",
        },
        {
          icon: <Hash className="w-3.5 h-3.5" />,
          badge: "+3 more",
          badgeColor: "bg-blue-100 text-blue-600",
          title: "Instagram, Twitter, LinkedIn",
          content: "Carousel post + thread with engagement hooks + professional article format",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Basic Review to SEO Powerhouse",
    before: {
      label: "Your rough idea",
      text: "Product review",
    },
    after: {
      label: "Content AI Output",
      sections: [
        {
          icon: <Tag className="w-3.5 h-3.5" />,
          badge: "Title",
          badgeColor: "bg-green-100 text-green-700",
          title: "SEO-Optimized Title",
          content: "\"I Tested [Product] for 30 Days - Honest Review (Is It Worth $X?)\"",
        },
        {
          icon: <Clock className="w-3.5 h-3.5" />,
          badge: "Structure",
          badgeColor: "bg-purple-100 text-purple-700",
          title: "Timestamps & Chapters",
          content: "0:00 Intro | 1:30 Unboxing | 3:00 Features | 6:00 Pros & Cons | 8:00 Verdict",
        },
        {
          icon: <FileText className="w-3.5 h-3.5" />,
          badge: "Meta",
          badgeColor: "bg-orange-100 text-orange-700",
          title: "Description & Tags",
          content: "2000-char SEO description + 15 targeted tags + affiliate link placement guide",
        },
      ],
    },
  },
];

function CardToggle({
  card,
  index,
}: {
  card: BeforeAfterCard;
  index: number;
}) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden card-hover"
    >
      {/* Card Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">
          {card.title}
        </h3>

        {/* Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setShowAfter(false)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              !showAfter
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              showAfter
                ? "bg-gradient-to-r from-secondary to-accent text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="px-6 pb-6 min-h-[240px]">
        <div className="relative">
          {/* Before */}
          <motion.div
            initial={false}
            animate={{
              opacity: showAfter ? 0 : 1,
              x: showAfter ? -20 : 0,
              position: showAfter ? "absolute" as const : "relative" as const,
            }}
            transition={{ duration: 0.3 }}
            className={`w-full ${showAfter ? "pointer-events-none" : ""}`}
          >
            <span className="inline-block px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground mb-3">
              {card.before.label}
            </span>
            <div className="bg-muted/50 rounded-xl p-6 border border-dashed border-primary/10">
              <p className="text-muted-foreground text-base italic">
                &quot;{card.before.text}&quot;
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              Just a rough idea with no structure
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={false}
            animate={{
              opacity: showAfter ? 1 : 0,
              x: showAfter ? 0 : 20,
              position: showAfter ? "relative" as const : "absolute" as const,
            }}
            transition={{ duration: 0.3 }}
            className={`w-full top-0 left-0 ${!showAfter ? "pointer-events-none" : ""}`}
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-100 text-xs font-medium text-green-700 mb-3">
              <Sparkles className="w-3 h-3" />
              {card.after.label}
            </span>
            <div className="space-y-2.5">
              {card.after.sections.map((section, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-primary/[0.03] to-secondary/[0.03] rounded-lg p-3.5 border border-primary/5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${section.badgeColor}`}
                    >
                      {section.icon}
                      {section.badge}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {section.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            <ArrowRight className="w-4 h-4" />
            Real Transformations
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            See the <span className="gradient-text">Transformation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From rough idea to production-ready content. Toggle between before
            and after to see what Content.ai creates from a single sentence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, index) => (
            <CardToggle key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
