import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "CAI-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function estimateReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

export function estimateVideoLength(wordCount: number): string {
  const minutes = Math.floor(wordCount / 150);
  const seconds = Math.round((wordCount % 150) / 2.5);
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    youtube: "#FF0000",
    tiktok: "#000000",
    instagram: "#E4405F",
    twitter: "#1DA1F2",
    linkedin: "#0077B5",
    podcast: "#9B59B6",
    blog: "#2ECC71",
    newsletter: "#F39C12",
  };
  return colors[platform] || "#1a1a2e";
}

export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    youtube: "▶",
    tiktok: "♪",
    instagram: "📷",
    twitter: "𝕏",
    linkedin: "in",
    podcast: "🎙",
    blog: "✍",
    newsletter: "📧",
  };
  return icons[platform] || "📝";
}

export function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string, type: string = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
