import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import NotificationToast from "@/components/shared/NotificationToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Content.ai — AI Content Production Studio for Creators",
  description:
    "Create 10x more content in half the time. AI-powered hooks, scripts, thumbnails, and complete content packages for every platform.",
  keywords: ["AI content creation", "content creator tools", "social media AI", "video script generator", "hook generator"],
  openGraph: {
    title: "Content.ai — AI Content Production Studio",
    description: "Create 10x more content in half the time with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased" style={{ ["--font-clash" as string]: "system-ui" }}>
        <AppProvider>
          {children}
          <NotificationToast />
        </AppProvider>
      </body>
    </html>
  );
}
