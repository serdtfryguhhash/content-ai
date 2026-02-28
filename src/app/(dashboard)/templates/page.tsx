"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Search, Star, Users, Lock, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import PageHeader from "@/components/shared/PageHeader";
import { DEMO_TEMPLATES } from "@/lib/constants";
import { getPlatformColor, getPlatformIcon, formatNumber, copyToClipboard } from "@/lib/utils";
import { Template } from "@/types";

const CATEGORIES = ["All", "Hooks", "Scripts", "Carousels", "Threads", "Posts", "Podcasts", "Newsletters", "Launches", "Vlogs"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const filtered = DEMO_TEMPLATES.filter((t) => {
    const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.niche.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader icon={LayoutGrid} title="Template Library" description="50+ battle-tested templates for every platform and niche" />

      {/* Search and filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search templates by name, niche, or platform..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat ? "gradient-bg text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template, i) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover cursor-pointer group overflow-hidden" onClick={() => setSelectedTemplate(template)}>
              {/* Color bar */}
              <div className="h-2" style={{ backgroundColor: getPlatformColor(template.platform) }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: `${getPlatformColor(template.platform)}15` }}>
                      {getPlatformIcon(template.platform)}
                    </div>
                    <div>
                      <Badge variant="outline" className="text-[10px] px-1.5">{template.category}</Badge>
                    </div>
                  </div>
                  {template.is_premium && (
                    <Badge className="bg-accent text-accent-foreground text-[10px]">
                      <Lock className="w-2.5 h-2.5 mr-0.5" /> PRO
                    </Badge>
                  )}
                </div>
                <h3 className="font-display font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">{template.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" /> {template.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {formatNumber(template.uses_count)}
                    </span>
                  </div>
                  <span className="text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Template →
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-display font-semibold">No templates found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Template Detail Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${getPlatformColor(selectedTemplate.platform)}15` }}>
                    {getPlatformIcon(selectedTemplate.platform)}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedTemplate.title}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedTemplate.category}</Badge>
                  <Badge variant="outline">{selectedTemplate.niche}</Badge>
                  <Badge variant="outline" className="capitalize">{selectedTemplate.platform}</Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Hook Template */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Hook Template
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(selectedTemplate.template_data.hook_template, "hook")}>
                      {copiedField === "hook" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-sm">{selectedTemplate.template_data.hook_template}</div>
                </div>

                {/* Script Template */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" /> Script Template
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(selectedTemplate.template_data.script_template, "script")}>
                      {copiedField === "script" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </div>
                  <div className="bg-secondary/5 rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto font-mono text-xs leading-relaxed">
                    {selectedTemplate.template_data.script_template}
                  </div>
                </div>

                {/* Caption Template */}
                {selectedTemplate.template_data.caption_template && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display font-semibold text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" /> Caption Template
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => handleCopy(selectedTemplate.template_data.caption_template, "caption")}>
                        {copiedField === "caption" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="bg-accent/5 rounded-lg p-4 text-sm whitespace-pre-wrap">{selectedTemplate.template_data.caption_template}</div>
                  </div>
                )}

                {/* Hashtags */}
                <div>
                  <h4 className="font-display font-semibold text-sm mb-2">Suggested Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.template_data.hashtag_suggestions.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>

                <Button variant="gradient" className="w-full" onClick={() => { setSelectedTemplate(null); window.location.href = "/studio"; }}>
                  <Sparkles className="w-4 h-4 mr-2" /> Use This Template in Studio
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
