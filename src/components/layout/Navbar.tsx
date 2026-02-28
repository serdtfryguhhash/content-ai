"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, LogOut, Settings, User, CreditCard, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";

const NAV_LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/hooks", label: "Hooks" },
  { href: "/scripts", label: "Scripts" },
  { href: "/calendar", label: "Calendar" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, credits } = useApp();

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Content<span className="gradient-text">.ai</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>{credits} credits</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar_url || undefined} />
                        <AvatarFallback className="text-xs">
                          {user?.full_name?.split(" ").map((n) => n[0]).join("") || "AC"}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.full_name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/studio" className="cursor-pointer">
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>AI Studio</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/analytics" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/referrals" className="cursor-pointer">
                        <Gift className="mr-2 h-4 w-4" />
                        <span>Referrals</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Upgrade Plan</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="gradient" size="sm">
                    Start Creating Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/analytics" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Analytics</Button>
                    </Link>
                    <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Settings</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="gradient" className="w-full">Start Creating Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
