export type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "linkedin" | "podcast" | "blog" | "newsletter";
export type ContentType = "short-form" | "long-form" | "carousel" | "thread" | "story" | "reel" | "article" | "episode";
export type HookStyle = "controversial" | "curiosity" | "story" | "stat" | "question";
export type SubscriptionTier = "free" | "creator" | "agency";
export type ContentStatus = "draft" | "scheduled" | "published" | "archived";

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  subscription_tier: SubscriptionTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  referral_code: string;
  referred_by: string | null;
  content_credits: number;
  created_at: string;
  updated_at: string;
}

export interface ContentPackage {
  id: string;
  user_id: string;
  platform: Platform;
  content_type: ContentType;
  topic: string;
  tone: string;
  target_audience: string;
  hooks: string[];
  script: string;
  caption: string;
  hashtags: string[];
  b_roll_list: string[];
  thumbnail_concept: string;
  thumbnail_url: string | null;
  status: ContentStatus;
  performance_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Hook {
  id: string;
  user_id: string;
  topic: string;
  style: HookStyle;
  hooks: string[];
  platform: Platform;
  saved: boolean;
  created_at: string;
}

export interface Script {
  id: string;
  user_id: string;
  title: string;
  topic: string;
  platform: Platform;
  outline: string[];
  full_script: string;
  word_count: number;
  estimated_duration: string;
  teleprompter_ready: boolean;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  niche: string;
  platform: Platform;
  content_type: ContentType;
  template_data: {
    hook_template: string;
    script_template: string;
    caption_template: string;
    hashtag_suggestions: string[];
  };
  uses_count: number;
  rating: number;
  is_premium: boolean;
  thumbnail_url: string;
  created_at: string;
}

export interface CalendarEntry {
  id: string;
  user_id: string;
  content_package_id: string | null;
  title: string;
  description: string;
  platform: Platform;
  scheduled_date: string;
  scheduled_time: string;
  status: ContentStatus;
  color: string;
  ai_suggested_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface PerformanceLog {
  id: string;
  user_id: string;
  content_package_id: string;
  platform: Platform;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagement_rate: number;
  logged_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  stripe_subscription_id: string;
  stripe_price_id: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: "pending" | "active" | "paid";
  commission_amount: number;
  total_earned: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  author_avatar: string;
  category: string;
  tags: string[];
  read_time: number;
  published_at: string;
  updated_at: string;
}

export interface NewsletterSub {
  id: string;
  email: string;
  first_name: string;
  convertkit_subscriber_id: string | null;
  subscribed_at: string;
  is_active: boolean;
}

export interface GenerateContentRequest {
  platform: Platform;
  content_type: ContentType;
  topic: string;
  tone?: string;
  target_audience?: string;
  additional_context?: string;
}

export interface GenerateHooksRequest {
  topic: string;
  style: HookStyle;
  platform: Platform;
  count?: number;
}

export interface GenerateScriptRequest {
  topic: string;
  platform: Platform;
  outline?: string[];
  tone?: string;
  target_length?: "short" | "medium" | "long";
}

export interface GenerateThumbnailRequest {
  topic: string;
  style: string;
  text_overlay?: string;
  platform: Platform;
}

export interface PricingTier {
  name: string;
  tier: SubscriptionTier;
  price: number;
  priceId: string;
  description: string;
  features: string[];
  limits: {
    content_packages: number;
    hooks_per_day: number;
    scripts_per_day: number;
    thumbnails_per_day: number;
    templates: number;
    calendar_entries: number;
  };
  popular?: boolean;
}

export interface AnalyticsData {
  totalContent: number;
  totalViews: number;
  totalEngagement: number;
  avgEngagementRate: number;
  topPlatform: Platform;
  contentByPlatform: { platform: Platform; count: number }[];
  performanceOverTime: { date: string; views: number; engagement: number }[];
  topContent: ContentPackage[];
  growthRate: number;
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  credits_used?: number;
  credits_remaining?: number;
}
