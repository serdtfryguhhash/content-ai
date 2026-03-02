"use client";

import { LibraryItem, Platform } from "@/types";

const STORAGE_KEY = "content_library";

function getAll(): LibraryItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveAll(items: LibraryItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getLibraryItems(): LibraryItem[] {
  return getAll();
}

export function addLibraryItem(item: Omit<LibraryItem, "id" | "createdAt">): LibraryItem {
  const items = getAll();
  const newItem: LibraryItem = {
    ...item,
    id: `lib-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  saveAll(items);
  return newItem;
}

export function removeLibraryItem(id: string): void {
  const items = getAll().filter((i) => i.id !== id);
  saveAll(items);
}

export function toggleFavorite(id: string): void {
  const items = getAll();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.isFavorite = !item.isFavorite;
    saveAll(items);
  }
}

export function updateTags(id: string, tags: string[]): void {
  const items = getAll();
  const item = items.find((i) => i.id === id);
  if (item) {
    item.tags = tags;
    saveAll(items);
  }
}

export function searchLibrary(query: string, platform?: Platform, favorites?: boolean): LibraryItem[] {
  let items = getAll();
  if (query) {
    const q = query.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.content.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (platform) {
    items = items.filter((i) => i.platform === platform);
  }
  if (favorites) {
    items = items.filter((i) => i.isFavorite);
  }
  return items;
}

export function getLibraryStats(): { total: number; byPlatform: Record<string, number>; favorites: number } {
  const items = getAll();
  const byPlatform: Record<string, number> = {};
  let favorites = 0;
  for (const item of items) {
    byPlatform[item.platform] = (byPlatform[item.platform] || 0) + 1;
    if (item.isFavorite) favorites++;
  }
  return { total: items.length, byPlatform, favorites };
}

export function getContentCount(): number {
  return getAll().length;
}
