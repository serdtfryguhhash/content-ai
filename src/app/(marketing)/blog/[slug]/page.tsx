"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DEMO_BLOG_POSTS } from "@/lib/constants";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = DEMO_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Post Not Found</h1>
        <p className="text-muted-foreground mb-4">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog"><Button variant="outline">Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>

          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-medium text-sm">{post.author}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.published_at}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read_time} min read</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Article content */}
          <article className="prose prose-gray max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("### ")) {
                return <h3 key={i} className="font-display text-xl font-semibold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter(Boolean);
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                    {items.map((item, j) => (
                      <li key={j} className="text-muted-foreground">{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
            })}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl gradient-bg text-white text-center">
            <h3 className="font-display text-2xl font-bold mb-3">Ready to Create Better Content?</h3>
            <p className="text-white/80 mb-6">Start using AI to produce viral-worthy content across every platform.</p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Creating Free
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
