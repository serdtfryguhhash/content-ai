"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary text-sm font-medium mb-6 shadow-sm">
                <Mail className="w-4 h-4" />
                Weekly Creator Newsletter
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Get AI Content Tips Every Week
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join 25,000+ creators getting weekly AI content strategies, templates, and insider tips 
                to grow faster across every platform.
              </p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 text-green-700 font-medium"
                >
                  <Sparkles className="w-5 h-5" />
                  You&apos;re in! Check your inbox for a welcome email.
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                  <Button type="submit" variant="gradient" size="lg">
                    Subscribe Free
                  </Button>
                </form>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Create Content That{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-secondary-300">
                Actually Grows Your Audience?
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Join 50,000+ creators who use Content.ai to produce better content, faster. 
              Start with our free plan — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button variant="gradient" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
