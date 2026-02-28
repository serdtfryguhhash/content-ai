"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building2, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { PRICING_TIERS } from "@/lib/stripe";

const FAQ = [
  { q: "Can I switch plans at any time?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the difference." },
  { q: "Is there a free trial?", a: "Our Free plan lets you test all core features. No credit card required. When you're ready for more, upgrade to Creator or Agency." },
  { q: "How does the referral program work?", a: "Share your unique referral link. When someone subscribes through it, you earn 25% recurring commission for as long as they remain subscribed." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel anytime with no penalties. You'll retain access until the end of your billing period." },
  { q: "Do you offer team/enterprise plans?", a: "The Agency plan includes 5 team seats. For larger teams or custom needs, contact us for a tailored enterprise plan." },
  { q: "What AI model do you use?", a: "We use GPT-4 Turbo for text generation and DALL-E 3 for thumbnail concepts. We're always updating to the latest and best models." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ICONS = [Sparkles, Zap, Building2];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 gradient-bg text-white border-0">Simple, Transparent Pricing</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Choose Your <span className="gradient-text">Creator Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free, scale when ready. All plans include access to our AI content engine. No hidden fees.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <Switch checked={annual} onCheckedChange={setAnnual} />
              <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual <Badge variant="success" className="ml-1">Save 20%</Badge>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {PRICING_TIERS.map((tier, i) => {
            const Icon = ICONS[i];
            const price = annual ? tier.price * 0.8 : tier.price;
            const isPopular = tier.popular;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="gradient-bg text-white border-0 shadow-lg px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <Card className={`h-full ${isPopular ? "border-primary shadow-xl ring-2 ring-primary/20 scale-105" : "border"}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPopular ? "gradient-bg" : "bg-primary/10"}`}>
                        <Icon className={`w-5 h-5 ${isPopular ? "text-white" : "text-primary"}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                    <div className="mb-6">
                      <span className="font-display text-4xl font-bold">
                        {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                      </span>
                      {price > 0 && <span className="text-muted-foreground">/month</span>}
                      {annual && price > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed ${(price * 12).toFixed(2)}/year (save ${((tier.price * 12) - (price * 12)).toFixed(2)})
                        </p>
                      )}
                    </div>
                    <Button
                      variant={isPopular ? "gradient" : "outline"}
                      className="w-full mb-6"
                      size="lg"
                    >
                      {price === 0 ? "Get Started Free" : `Start ${tier.name} Plan`}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <ul className="space-y-3">
                      {tier.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 rounded-xl border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{faq.q}</span>
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${openFaq === i ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-muted-foreground mt-3 leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
