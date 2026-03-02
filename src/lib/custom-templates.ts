"use client";

import { CustomTemplate } from "@/types";

const STORAGE_KEY = "custom_templates";

function getAll(): CustomTemplate[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveAll(templates: CustomTemplate[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

export function getCustomTemplates(): CustomTemplate[] {
  return getAll();
}

export function addCustomTemplate(template: Omit<CustomTemplate, "id" | "createdAt">): CustomTemplate {
  const templates = getAll();
  const newTemplate: CustomTemplate = {
    ...template,
    id: `ct-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  templates.unshift(newTemplate);
  saveAll(templates);
  return newTemplate;
}

export function removeCustomTemplate(id: string): void {
  const templates = getAll().filter((t) => t.id !== id);
  saveAll(templates);
}

export function updateCustomTemplate(id: string, data: Partial<CustomTemplate>): void {
  const templates = getAll();
  const template = templates.find((t) => t.id === id);
  if (template) {
    Object.assign(template, data);
    saveAll(templates);
  }
}

export function getCustomTemplateCount(): number {
  return getAll().length;
}
