"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, Users, DollarSign, TrendingUp, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { copyToClipboard } from "@/lib/utils";

const REFERRAL_STATS = [
  { label: "Total Referrals", value: "12", icon: Users, color: "text-blue-500" },
  { label: "Active Referrals", value: "8", icon: TrendingUp, color: "text-green-500" },
  { label: "Monthly Earnings", value: "$39.98", icon: DollarSign, color: "text-primary" },
  { label: "Total Earned", value: "$247.92", icon: Gift, color: "text-accent" },
];

const REFERRAL_HISTORY = [
  { name: "Sarah M.", date: "2026-02-15", status: "active", plan: "Creator", earned: "$5.00" },
  { name: "James K.", date: "2026-02-10", status: "active", plan: "Agency", earned: "$12.50" },
  { name: "Lisa T.", date: "2026-01-28", status: "active", plan: "Creator", earned: "$5.00" },
  { name: "Mike R.", date: "2026-01-15", status: "pending", plan: "Creator", earned: "$0.00" },
  { name: "Anna P.", date: "2026-01-05", status: "active", plan: "Creator", earned: "$5.00" },
];

export default function ReferralsPage() {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://contentai.studio/ref/${user?.referral_code || "CAI-ALEX42"}`;

  const handleCopy = async () => {
    await copyToClipboard(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader icon={Gift} title="Referral Program" description="Earn 25% recurring commission for every creator you refer" />

      {/* Referral Link */}
      <Card className="mb-8 overflow-hidden">
        <div className="gradient-bg p-8 text-white text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Earn 25% Recurring Commission</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Share your unique referral link and earn 25% of every subscription payment for as long as your referrals stay subscribed.
          </p>
          <div className="flex items-center gap-2 max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-2">
            <Input
              value={referralLink}
              readOnly
              className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0"
            />
            <Button variant="secondary" size="sm" onClick={handleCopy} className="shrink-0 bg-white text-primary hover:bg-white/90">
              {copied ? <><Check className="w-4 h-4 mr-1" /> Copied!</> : <><Copy className="w-4 h-4 mr-1" /> Copy</>}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-1" /> Share on X
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Link2 className="w-4 h-4 mr-1" /> Share on LinkedIn
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {REFERRAL_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-5">
                  <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* How it works */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Share Your Link", desc: "Copy your unique referral link and share it with fellow creators via social media, email, or DM." },
              { step: "2", title: "They Sign Up", desc: "When someone signs up using your link and subscribes to a paid plan, you earn commission." },
              { step: "3", title: "Get Paid Monthly", desc: "Earn 25% recurring commission on every payment. Get paid monthly via PayPal or bank transfer." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full gradient-bg text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commission table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Commission Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { plan: "Creator", price: "$19.99/mo", commission: "$5.00/mo", color: "primary" },
              { plan: "Agency", price: "$49.99/mo", commission: "$12.50/mo", color: "secondary" },
              { plan: "Annual Plans", price: "Up to $599.88/yr", commission: "Up to $149.97/yr", color: "accent" },
            ].map((tier) => (
              <div key={tier.plan} className="p-4 rounded-xl border text-center">
                <Badge className="mb-2">{tier.plan}</Badge>
                <p className="text-sm text-muted-foreground">{tier.price}</p>
                <p className="font-display text-xl font-bold gradient-text mt-2">{tier.commission}</p>
                <p className="text-xs text-muted-foreground">per referral</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Referral History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {REFERRAL_HISTORY.map((ref, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {ref.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{ref.name}</p>
                    <p className="text-xs text-muted-foreground">{ref.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">{ref.plan}</Badge>
                  <Badge variant={ref.status === "active" ? "success" : "warning"} className="text-xs">{ref.status}</Badge>
                  <span className="text-sm font-semibold w-16 text-right">{ref.earned}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
