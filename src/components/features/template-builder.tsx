"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Puzzle, Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCustomTemplates, addCustomTemplate, removeCustomTemplate } from "@/lib/custom-templates";
import { awardXP } from "@/lib/gamification";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/lib/constants";
import { getPlatformIcon, getPlatformColor } from "@/lib/utils";
import { CustomTemplate, Platform } from "@/types";

export default function TemplateBuilder() {
  const { addNotification } = useApp();
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [introFormula, setIntroFormula] = useState("");
  const [bodyPattern, setBodyPattern] = useState("");
  const [ctaStyle, setCtaStyle] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<CustomTemplate | null>(null);

  useEffect(() => {
    setTemplates(getCustomTemplates());
  }, []);

  const handleSave = () => {
    if (!name.trim() || !introFormula.trim()) {
      addNotification({
        id: Date.now().toString(),
        type: "warning",
        title: "Required Fields",
        message: "Please fill in the template name and intro formula.",
      });
      return;
    }

    addCustomTemplate({
      name,
      platform,
      introFormula,
      bodyPattern,
      ctaStyle,
      exampleOutput,
    });

    awardXP("create-template");

    setTemplates(getCustomTemplates());
    resetForm();
    setShowBuilder(false);

    addNotification({
      id: Date.now().toString(),
      type: "success",
      title: "Template Created!",
      message: "Your custom template has been saved to your library.",
    });
  };

  const handleDelete = (id: string) => {
    removeCustomTemplate(id);
    setTemplates(getCustomTemplates());
    setSelectedTemplate(null);
  };

  const resetForm = () => {
    setName("");
    setPlatform("youtube");
    setIntroFormula("");
    setBodyPattern("");
    setCtaStyle("");
    setExampleOutput("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <Puzzle className="w-5 h-5 text-accent" />
          My Custom Templates
          {templates.length > 0 && (
            <Badge variant="secondary" className="text-xs">{templates.length}</Badge>
          )}
        </h3>
        <Button variant="gradient" size="sm" onClick={() => setShowBuilder(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Template
        </Button>
      </div>

      {/* Templates grid */}
      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="card-hover cursor-pointer group"
                onClick={() => setSelectedTemplate(t)}
              >
                <div className="h-1.5" style={{ backgroundColor: getPlatformColor(t.platform) }} />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPlatformIcon(t.platform)}</span>
                      <h4 className="font-medium text-sm">{t.name}</h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(t.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{t.introFormula}</p>
                  <Badge variant="outline" className="text-[10px] capitalize">{t.platform}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center py-8">
            <Puzzle className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium mb-1">No custom templates yet</p>
            <p className="text-xs text-muted-foreground mb-3">Create templates to speed up your workflow</p>
            <Button variant="outline" size="sm" onClick={() => setShowBuilder(true)}>
              <Plus className="w-3 h-3 mr-1" /> Create Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Builder dialog */}
      <Dialog open={showBuilder} onOpenChange={setShowBuilder}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-accent" />
              Create Custom Template
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Template Name</label>
              <Input placeholder="e.g., My Viral Hook Formula" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <span className="flex items-center gap-2"><span>{p.icon}</span> {p.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Intro Formula</label>
              <Textarea
                placeholder="e.g., Start with a controversial statement about [topic], then reveal a surprising stat..."
                value={introFormula}
                onChange={(e) => setIntroFormula(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Body Pattern</label>
              <Textarea
                placeholder="e.g., 3 main points with examples, each followed by a transition..."
                value={bodyPattern}
                onChange={(e) => setBodyPattern(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CTA Style</label>
              <Input
                placeholder="e.g., Direct question + Follow prompt"
                value={ctaStyle}
                onChange={(e) => setCtaStyle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Example Output (optional)</label>
              <Textarea
                placeholder="Paste an example of content that follows this template..."
                value={exampleOutput}
                onChange={(e) => setExampleOutput(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { setShowBuilder(false); resetForm(); }}>
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button variant="gradient" className="flex-1" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" /> Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template detail dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-lg">{getPlatformIcon(selectedTemplate.platform)}</span>
                  {selectedTemplate.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Intro Formula</p>
                  <div className="bg-primary/5 rounded-lg p-3 text-sm">{selectedTemplate.introFormula}</div>
                </div>
                {selectedTemplate.bodyPattern && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Body Pattern</p>
                    <div className="bg-secondary/5 rounded-lg p-3 text-sm whitespace-pre-wrap">{selectedTemplate.bodyPattern}</div>
                  </div>
                )}
                {selectedTemplate.ctaStyle && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">CTA Style</p>
                    <div className="bg-accent/5 rounded-lg p-3 text-sm">{selectedTemplate.ctaStyle}</div>
                  </div>
                )}
                {selectedTemplate.exampleOutput && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Example Output</p>
                    <div className="bg-muted rounded-lg p-3 text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                      {selectedTemplate.exampleOutput}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
