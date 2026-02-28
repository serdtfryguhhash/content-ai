"use client";

import React, { useState } from "react";

import { Settings, User, Bell, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { user } = useApp();
  const [name, setName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState({ email: true, push: true, weekly: true, marketing: false });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader icon={Settings} title="Settings" description="Manage your account and preferences" />

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Profile</CardTitle>
            <CardDescription>Your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                {name.split(" ").map((n) => n[0]).join("")}
              </div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Tone</label>
              <Select defaultValue="Professional">
                <SelectTrigger className="w-full md:w-[250px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Professional", "Casual", "Humorous", "Inspirational", "Educational"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="gradient" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Subscription</CardTitle>
            <CardDescription>Manage your plan and billing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg">Creator Plan</span>
                  <Badge className="bg-primary">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">$19.99/month - Renews March 15, 2026</p>
              </div>
              <Button variant="outline" size="sm">Manage Billing</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Content Packages", used: 3, total: 50 },
                { label: "Hooks Today", used: 2, total: -1 },
                { label: "Scripts Today", used: 1, total: 20 },
                { label: "Thumbnails Today", used: 0, total: 10 },
              ].map((usage) => (
                <div key={usage.label} className="p-3 rounded-lg border text-center">
                  <p className="text-2xl font-bold gradient-text">{usage.used}</p>
                  <p className="text-xs text-muted-foreground">
                    of {usage.total === -1 ? "Unlimited" : usage.total}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">{usage.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</CardTitle>
            <CardDescription>Choose what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive notifications about generated content and tips" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications for scheduled posts" },
              { key: "weekly", label: "Weekly Report", desc: "Weekly analytics summary sent every Monday" },
              { key: "marketing", label: "Product Updates", desc: "News about new features and promotions" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently remove your account and all data</p>
              </div>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
