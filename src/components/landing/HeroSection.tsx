"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 50,000+ Content Creators</span>
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 fill-accent text-accent" />
              ))}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Create{" "}
            <span className="gradient-text">10x More Content</span>
            {" "}in Half the Time
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            Your AI-powered content production studio. Generate viral hooks, scripts, thumbnails, 
            and complete content packages for every platform — all in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="group">
                Start Creating Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/studio">
              <Button variant="outline" size="xl" className="group">
                <Play className="mr-2 w-5 h-5" />
                See It in Action
              </Button>
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-muted-foreground mt-6"
          >
            No credit card required. Free plan available. Cancel anytime.
          </motion.p>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border shadow-2xl overflow-hidden bg-white">
              {/* Fake app header */}
              <div className="bg-gray-50 border-b px-6 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-white text-xs text-muted-foreground border">
                    contentai.studio/studio
                  </div>
                </div>
              </div>
              {/* Fake app content */}
              <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left panel */}
                  <div className="bg-white rounded-xl p-6 border shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-display font-semibold text-sm">Content Studio</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-gray-100 rounded-lg" />
                      <div className="h-8 bg-gray-100 rounded-lg" />
                      <div className="h-8 bg-gray-100 rounded-lg" />
                      <div className="h-10 gradient-bg rounded-lg flex items-center justify-center text-white text-sm font-medium">
                        Generate Content
                      </div>
                    </div>
                  </div>

                  {/* Center panel */}
                  <div className="md:col-span-2 bg-white rounded-xl p-6 border shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Generated</div>
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">YouTube</div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                        <p className="text-sm font-medium text-foreground">5 Viral Hooks Generated</p>
                        <p className="text-xs text-muted-foreground mt-1">Ready for your next YouTube video</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Hook #1</p>
                        <p className="text-sm text-foreground mt-1">&quot;Nobody tells you this about growing on YouTube, but after hitting 1M subscribers, I can tell you the #1 mistake creators make is...&quot;</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Hook #2</p>
                        <p className="text-sm text-foreground mt-1">&quot;I spent $50,000 testing YouTube strategies so you don&apos;t have to. Here are the 3 that actually work...&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
