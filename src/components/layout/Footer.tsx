"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "AI Studio", href: "/studio" },
    { label: "Hook Generator", href: "/hooks" },
    { label: "Script Writer", href: "/scripts" },
    { label: "Content Calendar", href: "/calendar" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Templates Library", href: "/templates" },
    { label: "Creator Academy", href: "/blog" },
    { label: "API Documentation", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Affiliate Program", href: "/referrals" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Content.ai
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              The AI-powered content production studio for modern creators. Create better content, faster.
            </p>
            <div className="flex gap-4">
              {["twitter", "instagram", "youtube", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold uppercase"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm mb-4 text-white">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            2026 Content.ai. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made with AI + Human Creativity
          </p>
        </div>
      </div>
    </footer>
  );
}
