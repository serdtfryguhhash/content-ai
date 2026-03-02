"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Library, Search, Trash2, Tag, Copy, Check,
  Repeat, Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import RepurposeWizard from "@/components/features/repurpose-wizard";
import {
  removeLibraryItem,
  toggleFavorite,
  updateTags,
  searchLibrary,
} from "@/lib/library";
import { getPlatformColor, getPlatformIcon, copyToClipboard, formatDate, truncate } from "@/lib/utils";
import { PLATFORMS } from "@/lib/constants";
import { LibraryItem, Platform } from "@/types";

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "">("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [repurposeItem, setRepurposeItem] = useState<LibraryItem | null>(null);

  const refreshItems = useCallback(() => {
    const filtered = searchLibrary(
      search,
      platformFilter || undefined,
      favoritesOnly || undefined
    );
    setItems(filtered);
  }, [search, platformFilter, favoritesOnly]);

  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  const handleDelete = (id: string) => {
    removeLibraryItem(id);
    refreshItems();
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    refreshItems();
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, isFavorite: !selectedItem.isFavorite });
    }
  };

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddTag = (id: string) => {
    if (!tagInput.trim()) return;
    const item = items.find((i) => i.id === id);
    if (item && !item.tags.includes(tagInput.trim())) {
      updateTags(id, [...item.tags, tagInput.trim()]);
      refreshItems();
      if (selectedItem?.id === id) {
        setSelectedItem({ ...selectedItem, tags: [...selectedItem.tags, tagInput.trim()] });
      }
    }
    setTagInput("");
  };

  const handleRemoveTag = (id: string, tag: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      updateTags(id, item.tags.filter((t) => t !== tag));
      refreshItems();
      if (selectedItem?.id === id) {
        setSelectedItem({ ...selectedItem, tags: selectedItem.tags.filter((t) => t !== tag) });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        icon={Library}
        title="Content Library"
        description={`${items.length} pieces of content in your library`}
      >
        <Badge variant="secondary" className="gap-1">
          <Library className="w-3 h-3" /> {items.length} items
        </Badge>
      </PageHeader>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your content library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              favoritesOnly ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${favoritesOnly ? "fill-secondary" : ""}`} />
            Favorites
          </button>
        </div>
      </div>

      {/* Platform filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => setPlatformFilter("")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !platformFilter ? "gradient-bg text-white shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All Platforms
          </button>
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPlatformFilter(p.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                platformFilter === p.value
                  ? "gradient-bg text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="card-hover cursor-pointer group overflow-hidden" onClick={() => setSelectedItem(item)}>
                <div className="h-1.5" style={{ backgroundColor: getPlatformColor(item.platform) }} />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPlatformIcon(item.platform)}</span>
                      <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(item.id);
                        }}
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${item.isFavorite ? "fill-secondary text-secondary" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                    {truncate(item.content, 150)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{item.tags.length - 2}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Library}
          title="Your library is empty"
          description="Generate content in the Studio to start building your library. The more you create, the more valuable this archive becomes."
          actionLabel="Go to Studio"
          onAction={() => window.location.href = "/studio"}
        />
      )}

      {/* Item detail dialog */}
      <Dialog open={!!selectedItem && !repurposeItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPlatformIcon(selectedItem.platform)}</span>
                  <div>
                    <DialogTitle>{selectedItem.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">{selectedItem.platform}</Badge>
                      <Badge variant="outline" className="text-xs">{selectedItem.type}</Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(selectedItem.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Content */}
                <div className="bg-primary/3 rounded-xl p-4 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                  {selectedItem.content}
                </div>

                {/* Tags */}
                <div>
                  <p className="text-xs font-medium mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(selectedItem.id, tag)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag(selectedItem.id)}
                      className="text-sm h-8"
                    />
                    <Button size="sm" variant="outline" onClick={() => handleAddTag(selectedItem.id)}>
                      <Tag className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleCopy(selectedItem.content, "detail")}
                  >
                    {copiedField === "detail" ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setRepurposeItem(selectedItem);
                      setSelectedItem(null);
                    }}
                  >
                    <Repeat className="w-4 h-4 mr-1" />
                    Repurpose
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleToggleFavorite(selectedItem.id)}
                  >
                    <Heart className={`w-4 h-4 ${selectedItem.isFavorite ? "fill-secondary text-secondary" : ""}`} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Repurpose dialog */}
      <Dialog open={!!repurposeItem} onOpenChange={(open) => !open && setRepurposeItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {repurposeItem && (
            <RepurposeWizard
              initialContent={repurposeItem.content}
              initialTitle={repurposeItem.title}
              initialPlatform={repurposeItem.platform}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
