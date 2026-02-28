-- Content.ai Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'creator', 'agency')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  referral_code TEXT UNIQUE NOT NULL DEFAULT ('CAI-' || upper(substr(md5(random()::text), 1, 6))),
  referred_by TEXT REFERENCES public.users(referral_code),
  content_credits INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Packages
CREATE TABLE public.content_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'instagram', 'twitter', 'linkedin', 'podcast', 'blog', 'newsletter')),
  content_type TEXT NOT NULL CHECK (content_type IN ('short-form', 'long-form', 'carousel', 'thread', 'story', 'reel', 'article', 'episode')),
  topic TEXT NOT NULL,
  tone TEXT DEFAULT 'Professional',
  target_audience TEXT,
  hooks TEXT[] DEFAULT '{}',
  script TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  hashtags TEXT[] DEFAULT '{}',
  b_roll_list TEXT[] DEFAULT '{}',
  thumbnail_concept TEXT DEFAULT '',
  thumbnail_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  performance_score REAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Hooks
CREATE TABLE public.hooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  style TEXT NOT NULL CHECK (style IN ('controversial', 'curiosity', 'story', 'stat', 'question')),
  hooks TEXT[] DEFAULT '{}',
  platform TEXT NOT NULL,
  saved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Templates
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  niche TEXT NOT NULL,
  platform TEXT NOT NULL,
  content_type TEXT NOT NULL,
  template_data JSONB NOT NULL DEFAULT '{}',
  uses_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Calendar Entries
CREATE TABLE public.calendar_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content_package_id UUID REFERENCES public.content_packages(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  platform TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL DEFAULT '12:00',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  color TEXT DEFAULT '#7C3AED',
  ai_suggested_time TIME,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Logs
CREATE TABLE public.performance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content_package_id UUID NOT NULL REFERENCES public.content_packages(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  engagement_rate REAL DEFAULT 0,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'creator', 'agency')),
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrals
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paid')),
  commission_amount REAL DEFAULT 0,
  total_earned REAL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL,
  author_avatar TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE public.newsletter_subs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT DEFAULT '',
  convertkit_subscriber_id TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can CRUD own content" ON public.content_packages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own hooks" ON public.hooks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own calendar" ON public.calendar_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can read own perf" ON public.performance_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own subs" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);

-- Public read for templates and blog posts
CREATE POLICY "Anyone can read templates" ON public.templates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read blog" ON public.blog_posts FOR SELECT TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX idx_content_packages_user ON public.content_packages(user_id);
CREATE INDEX idx_content_packages_platform ON public.content_packages(platform);
CREATE INDEX idx_hooks_user ON public.hooks(user_id);
CREATE INDEX idx_calendar_user_date ON public.calendar_entries(user_id, scheduled_date);
CREATE INDEX idx_perf_logs_user ON public.performance_logs(user_id);
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX idx_blog_slug ON public.blog_posts(slug);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_content_packages_updated_at BEFORE UPDATE ON public.content_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_calendar_entries_updated_at BEFORE UPDATE ON public.calendar_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
