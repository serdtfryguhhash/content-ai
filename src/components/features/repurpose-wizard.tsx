"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Repeat, Loader2, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PLATFORMS } from "@/lib/constants";
import { getPlatformIcon } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { awardXP } from "@/lib/gamification";
import { useApp } from "@/context/AppContext";
import { RepurposedContent, Platform } from "@/types";

interface RepurposeWizardProps {
  initialContent?: string;
  initialTitle?: string;
  initialPlatform?: Platform;
}

export default function RepurposeWizard({ initialContent, initialTitle, initialPlatform }: RepurposeWizardProps) {
  const { addNotification } = useApp();
  const [content, setContent] = useState(initialContent || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [sourcePlatform, setSourcePlatform] = useState<Platform>(initialPlatform || "youtube");
  const [results, setResults] = useState<RepurposedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("youtube");

  const handleRepurpose = async () => {
    if (!content.trim()) {
      addNotification({
        id: Date.now().toString(),
        type: "warning",
        title: "Content Required",
        message: "Please enter the content you want to repurpose.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, sourcePlatform, title }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResults(data.data);
        awardXP("repurpose-content");
        addNotification({
          id: Date.now().toString(),
          type: "success",
          title: "Content Repurposed!",
          message: "Your content has been adapted for 8 platforms.",
        });
        if (data.data.length > 0) {
          setActiveTab(data.data[0].platform);
        }
      }
    } catch {
      addNotification({
        id: Date.now().toString(),
        type: "error",
        title: "Repurpose Failed",
        message: "Failed to repurpose content. Please try again.",
      });
    }
    setLoading(false);
  };

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      {!results.length && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Repeat className="w-5 h-5 text-secondary" />
              Content Repurposer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Content title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Source Platform</label>
              <Select value={sourcePlatform} onValueChange={(v) => setSourcePlatform(v as Platform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <span className="flex items-center gap-2">
                        <span>{p.icon}</span> {p.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Original Content</label>
              <Textarea
                placeholder="Paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <Button
              variant="gradient"
              className="w-full"
              onClick={handleRepurpose}
              disabled={loading || !content.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Repurposing for 8 Platforms...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Repurpose for All Platforms
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Repeat className="w-5 h-5 text-secondary" />
              Repurposed Content
            </h3>
            <Button variant="outline" size="sm" onClick={() => setResults([])}>
              Start Over
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 lg:grid-cols-8 h-auto gap-1 bg-transparent p-0 mb-4">
              {results.map((r) => (
                <TabsTrigger
                  key={r.platform}
                  value={r.platform}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-2 flex flex-col items-center gap-1 border text-xs"
                >
                  <span className="text-sm">{getPlatformIcon(r.platform)}</span>
                  <span className="capitalize hidden sm:block">{r.platform}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {results.map((r) => (
              <TabsContent key={r.platform} value={r.platform}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{r.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{r.format}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(r.content, r.platform)}
                    >
                      {copiedField === r.platform ? (
                        <Check className="w-3 h-3 mr-1" />
                      ) : (
                        <Copy className="w-3 h-3 mr-1" />
                      )}
                      Copy
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/3 rounded-xl p-4 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                      {r.content}
                    </div>
                    {r.tips && (
                      <div className="mt-3 p-3 rounded-lg bg-amber-50 text-xs text-amber-800">
                        <strong>Tip:</strong> {r.tips}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      )}
    </div>
  );
}
