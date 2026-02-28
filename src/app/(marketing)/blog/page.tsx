"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DEMO_BLOG_POSTS } from "@/lib/constants";

const CATEGORIES = ["All", "AI & Content", "Strategy", "Writing", "Growth", "Tools"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = DEMO_BLOG_POSTS.filter((post) => {
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || post.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 gradient-bg text-white border-0">
              <BookOpen className="w-3 h-3 mr-1" /> Creator Blog
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Learn, Grow, <span className="gradient-text">Create</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert strategies, AI tips, and insider knowledge to help you create better content and grow your audience.
            </p>
          </motion.div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat ? "gradient-bg text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {filtered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link href={`/blog/${filtered[0].slug}`}>
              <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl border shadow-sm overflow-hidden card-hover">
                <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Featured Article</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3">{filtered[0].category}</Badge>
                  <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {filtered[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{filtered[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{filtered[0].author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {filtered[0].read_time} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white rounded-xl border shadow-sm overflow-hidden card-hover h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary/20" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{post.category}</Badge>
                    <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read_time} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
