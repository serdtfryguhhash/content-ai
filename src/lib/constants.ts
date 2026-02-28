import { Platform, ContentType, HookStyle, Template, BlogPost } from "@/types";

export const PLATFORMS: { value: Platform; label: string; icon: string; color: string }[] = [
  { value: "youtube", label: "YouTube", icon: "▶", color: "#FF0000" },
  { value: "tiktok", label: "TikTok", icon: "♪", color: "#000000" },
  { value: "instagram", label: "Instagram", icon: "📷", color: "#E4405F" },
  { value: "twitter", label: "X (Twitter)", icon: "𝕏", color: "#1DA1F2" },
  { value: "linkedin", label: "LinkedIn", icon: "in", color: "#0077B5" },
  { value: "podcast", label: "Podcast", icon: "🎙", color: "#9B59B6" },
  { value: "blog", label: "Blog", icon: "✍", color: "#2ECC71" },
  { value: "newsletter", label: "Newsletter", icon: "📧", color: "#F39C12" },
];

export const CONTENT_TYPES: { value: ContentType; label: string; platforms: Platform[] }[] = [
  { value: "short-form", label: "Short-Form Video", platforms: ["youtube", "tiktok", "instagram"] },
  { value: "long-form", label: "Long-Form Video", platforms: ["youtube", "podcast"] },
  { value: "carousel", label: "Carousel Post", platforms: ["instagram", "linkedin"] },
  { value: "thread", label: "Thread", platforms: ["twitter", "linkedin"] },
  { value: "story", label: "Story", platforms: ["instagram", "tiktok"] },
  { value: "reel", label: "Reel", platforms: ["instagram", "tiktok", "youtube"] },
  { value: "article", label: "Article", platforms: ["blog", "linkedin", "newsletter"] },
  { value: "episode", label: "Episode", platforms: ["podcast", "youtube"] },
];

export const HOOK_STYLES: { value: HookStyle; label: string; description: string; icon: string }[] = [
  { value: "controversial", label: "Controversial", description: "Bold, opinion-driven hooks that spark debate", icon: "🔥" },
  { value: "curiosity", label: "Curiosity Gap", description: "Tease information to create an irresistible urge to learn more", icon: "🤔" },
  { value: "story", label: "Storytelling", description: "Open with a compelling narrative that draws viewers in", icon: "📖" },
  { value: "stat", label: "Statistic", description: "Lead with surprising data or numbers", icon: "📊" },
  { value: "question", label: "Question", description: "Ask thought-provoking questions that demand answers", icon: "❓" },
];

export const TONES = [
  "Professional", "Casual", "Humorous", "Inspirational", "Educational",
  "Provocative", "Empathetic", "Authoritative", "Conversational", "Storytelling",
];

export const NICHES = [
  "Tech & SaaS", "Finance & Crypto", "Health & Fitness", "Lifestyle & Travel",
  "Food & Cooking", "Business & Entrepreneurship", "Education & Learning",
  "Gaming", "Beauty & Fashion", "Real Estate", "Personal Development",
  "Marketing & Social Media", "Comedy & Entertainment", "News & Politics",
  "Science & Nature", "Arts & Design", "Music", "Sports", "Parenting", "DIY & Crafts",
];

export const DEMO_TEMPLATES: Template[] = [
  {
    id: "t1",
    title: "The Viral Hook Formula",
    description: "A proven 3-part hook structure that stops the scroll and keeps viewers watching.",
    category: "Hooks",
    niche: "Marketing & Social Media",
    platform: "tiktok",
    content_type: "short-form",
    template_data: {
      hook_template: "Stop scrolling if you [audience pain point]. I discovered [solution] that [result] in just [timeframe].",
      script_template: "HOOK: Stop scrolling if you [pain point].\n\nPROBLEM: Most people think [common misconception]...\n\nSOLUTION: But here's what actually works — [your method]\n\nStep 1: [First action]\nStep 2: [Second action]\nStep 3: [Third action]\n\nRESULT: When I did this, [impressive result].\n\nCTA: Follow for more [topic] tips. Save this for later!",
      caption_template: "The [topic] hack nobody talks about 🤫\n\nI went from [before state] to [after state] using this simple method.\n\nSave this and try it today 👇",
      hashtag_suggestions: ["#contentcreator", "#growthhack", "#viral", "#socialmediatips"],
    },
    uses_count: 12847,
    rating: 4.9,
    is_premium: false,
    thumbnail_url: "/templates/viral-hook.jpg",
    created_at: "2024-01-15",
  },
  {
    id: "t2",
    title: "YouTube Explainer Video",
    description: "Complete structure for educational YouTube videos that retain viewers til the end.",
    category: "Scripts",
    niche: "Education & Learning",
    platform: "youtube",
    content_type: "long-form",
    template_data: {
      hook_template: "What if I told you that [surprising fact]? In this video, I'll show you exactly [promise] — and by the end, you'll [benefit].",
      script_template: "COLD OPEN (0:00-0:30):\n[Start with a mind-blowing fact or demonstration]\n\nINTRO (0:30-1:30):\n\"Hey everyone, welcome back to the channel. Today we're diving into [topic] — and trust me, this is going to change how you think about [subject].\"\n\nCHAPTER 1: The Problem (1:30-4:00)\n- Explain why this matters\n- Share the common struggles\n- Use a relatable example\n\nCHAPTER 2: The Framework (4:00-8:00)\n- Introduce your solution/method\n- Break it down step by step\n- Show real examples\n\nCHAPTER 3: Implementation (8:00-12:00)\n- Walk through how to actually do it\n- Screen share or demonstration\n- Address common mistakes\n\nCHAPTER 4: Results & Proof (12:00-14:00)\n- Show case studies or your own results\n- Before and after comparison\n\nOUTRO (14:00-15:00):\n\"If this helped you, smash that like button and subscribe for more [topic] content every [schedule]. Drop a comment telling me [question].\"\n\nEND SCREEN:\n\"Watch this next — [related video]\"",
      caption_template: "🎬 NEW VIDEO: [Title]\n\nEverything you need to know about [topic], broken down step by step.\n\nTimestamps:\n0:00 - Intro\n1:30 - The Problem\n4:00 - The Framework\n8:00 - Implementation\n12:00 - Results\n14:00 - Outro\n\n🔔 Subscribe for weekly [topic] content!",
      hashtag_suggestions: ["#youtube", "#educational", "#howto", "#tutorial", "#learnontiktok"],
    },
    uses_count: 8932,
    rating: 4.8,
    is_premium: false,
    thumbnail_url: "/templates/yt-explainer.jpg",
    created_at: "2024-01-20",
  },
  {
    id: "t3",
    title: "Instagram Carousel Masterclass",
    description: "10-slide carousel structure designed for maximum saves and shares.",
    category: "Carousels",
    niche: "Business & Entrepreneurship",
    platform: "instagram",
    content_type: "carousel",
    template_data: {
      hook_template: "Slide 1: [Number] [Topic] Secrets That [Promise] (Save This!)",
      script_template: "SLIDE 1 (Cover): Bold title with emoji hook\n\"[Number] [Topic] Secrets That Changed My [Area]\"\n\nSLIDE 2 (Problem): \n\"You're probably making these mistakes...\"\n- Mistake #1\n- Mistake #2\n- Mistake #3\n\nSLIDE 3-8 (Tips):\nEach slide = 1 tip with:\n- Catchy headline\n- 2-3 bullet points\n- Visual icon or example\n\nSLIDE 9 (Summary):\n\"Quick Recap:\"\n✅ Tip 1\n✅ Tip 2\n✅ Tip 3...\n\nSLIDE 10 (CTA):\n\"Found this helpful?\"\n💾 Save for later\n📤 Share with a friend\n👤 Follow @[handle] for daily [topic] tips",
      caption_template: "Stop making these [topic] mistakes ❌\n\nI spent [timeframe] learning [topic] the hard way.\n\nHere are [number] secrets I wish I knew from day one 👆\n\nWhich tip surprised you the most? Comment below! 👇\n\n♻️ Share this with someone who needs to see it\n💾 Save this post for when you need it",
      hashtag_suggestions: ["#instagramtips", "#carousel", "#businesstips", "#entrepreneurship", "#socialmediamarketing"],
    },
    uses_count: 15634,
    rating: 4.9,
    is_premium: false,
    thumbnail_url: "/templates/ig-carousel.jpg",
    created_at: "2024-02-01",
  },
  {
    id: "t4",
    title: "Twitter/X Thread Blueprint",
    description: "Engagement-optimized thread structure with built-in virality mechanics.",
    category: "Threads",
    niche: "Tech & SaaS",
    platform: "twitter",
    content_type: "thread",
    template_data: {
      hook_template: "I [achievement] in [timeframe].\n\nHere's the exact playbook (bookmark this):\n\n🧵👇",
      script_template: "TWEET 1 (Hook):\nI [big achievement/claim] in [timeframe].\n\nHere's the exact playbook (bookmark this):\n\n🧵👇\n\nTWEET 2 (Context):\n[Timeframe] ago, I was [starting point].\n\n[Describe the struggle or starting position]\n\nThen I discovered something that changed everything:\n\nTWEET 3-8 (Value Tweets):\nStep [N]: [Action Item]\n\n• Detail point 1\n• Detail point 2\n• Pro tip or insight\n\n[Optional: screenshot or visual]\n\nTWEET 9 (Proof/Results):\nThe results?\n\n📈 [Metric 1]\n💰 [Metric 2]\n⏱️ [Metric 3]\n\nTWEET 10 (CTA):\nTL;DR:\n\n1. [Summary point 1]\n2. [Summary point 2]\n3. [Summary point 3]\n\nIf this thread helped you:\n1. Follow me @[handle] for daily [topic] insights\n2. RT the first tweet to help others\n3. Bookmark this thread for reference",
      caption_template: "",
      hashtag_suggestions: ["#buildinpublic", "#startup", "#growthhacking", "#tech"],
    },
    uses_count: 21456,
    rating: 4.7,
    is_premium: false,
    thumbnail_url: "/templates/twitter-thread.jpg",
    created_at: "2024-02-05",
  },
  {
    id: "t5",
    title: "LinkedIn Thought Leadership",
    description: "Authority-building LinkedIn post formula for B2B creators.",
    category: "Posts",
    niche: "Business & Entrepreneurship",
    platform: "linkedin",
    content_type: "article",
    template_data: {
      hook_template: "I [did something counterintuitive] and it [surprising result].\n\nHere's why most [professionals] get this wrong:",
      script_template: "LINE 1 (Hook - most important!):\nI [contrarian action/opinion].\n\n[Line break for suspense]\n\nPARAGRAPH 1 (Story):\n[Brief personal anecdote, 2-3 sentences]\n[Set the scene, make it relatable]\n\nPARAGRAPH 2 (The Insight):\nHere's what I learned:\n\n→ [Insight 1 with explanation]\n→ [Insight 2 with explanation]\n→ [Insight 3 with explanation]\n\nPARAGRAPH 3 (The Framework):\nMy simple framework for [topic]:\n\n1️⃣ [Step 1]: [Brief explanation]\n2️⃣ [Step 2]: [Brief explanation]\n3️⃣ [Step 3]: [Brief explanation]\n\nPARAGRAPH 4 (CTA):\nThe bottom line?\n\n[One powerful closing statement]\n\n♻️ Repost if this resonated\n💬 What's your take? I read every comment.\n\n#[tag1] #[tag2] #[tag3]",
      caption_template: "",
      hashtag_suggestions: ["#leadership", "#business", "#career", "#linkedintips", "#thoughtleadership"],
    },
    uses_count: 9876,
    rating: 4.8,
    is_premium: false,
    thumbnail_url: "/templates/linkedin-post.jpg",
    created_at: "2024-02-10",
  },
  {
    id: "t6",
    title: "Podcast Episode Outline",
    description: "Interview-style podcast episode structure with segment breakdowns.",
    category: "Podcasts",
    niche: "Business & Entrepreneurship",
    platform: "podcast",
    content_type: "episode",
    template_data: {
      hook_template: "What if the one thing holding you back from [goal] was something you could fix in [timeframe]? Today's guest [guest name] reveals exactly how.",
      script_template: "PRE-ROLL (0:00-1:00):\n\"Welcome to [Podcast Name], the show where we [value proposition]. I'm your host [name], and today's episode is going to blow your mind.\"\n\nINTRO & GUEST BIO (1:00-3:00):\n\"My guest today is [name], who [impressive credential]. They've [achievement] and today they're sharing [topic].\"\n\nSEGMENT 1: Origin Story (3:00-12:00)\n- How did you get started in [field]?\n- What was your biggest early struggle?\n- What was the turning point?\n\nSEGMENT 2: Deep Dive (12:00-28:00)\n- Walk us through your framework for [topic]\n- What's the biggest mistake people make?\n- Can you give us a specific example?\n\nSEGMENT 3: Tactical Advice (28:00-40:00)\n- If someone's starting from zero, what should they do first?\n- What tools/resources do you recommend?\n- What's one thing listeners can do TODAY?\n\nSEGMENT 4: Rapid Fire (40:00-45:00)\n- Best book you've read recently?\n- One habit that changed your life?\n- Best piece of advice you've ever received?\n\nOUTRO (45:00-48:00):\n\"Where can people find you?\"\n\"Thanks so much for listening. If you enjoyed this, leave a 5-star review...\"",
      caption_template: "🎙 NEW EPISODE\n\n[Guest Name] went from [starting point] to [achievement].\n\nIn this episode, they reveal:\n\n✅ [Takeaway 1]\n✅ [Takeaway 2]\n✅ [Takeaway 3]\n\nListen now: [link]\n\n#podcast #[topic]",
      hashtag_suggestions: ["#podcast", "#interview", "#entrepreneurship", "#podcastlife"],
    },
    uses_count: 5432,
    rating: 4.6,
    is_premium: true,
    thumbnail_url: "/templates/podcast-ep.jpg",
    created_at: "2024-02-15",
  },
  {
    id: "t7",
    title: "Product Launch Announcement",
    description: "Multi-platform product launch content suite with countdown mechanics.",
    category: "Launches",
    niche: "Tech & SaaS",
    platform: "instagram",
    content_type: "reel",
    template_data: {
      hook_template: "We've been working on something for [timeframe]... and it's finally here 🚀",
      script_template: "TEASER (3-5 days before):\n\"Something BIG is coming on [date]... 👀\"\n[Show blurred/mysterious preview]\n\nCOUNTDOWN (Day before):\n\"Tomorrow changes everything.\"\n[Quick montage of behind-the-scenes]\n\nLAUNCH DAY:\n\"It's HERE. Introducing [Product Name] 🎉\"\n\nProblem: [What people struggle with]\nSolution: [Your product]\n\nKey Features:\n🎯 [Feature 1] — [Benefit]\n⚡ [Feature 2] — [Benefit]\n🔥 [Feature 3] — [Benefit]\n\nSocial Proof:\n\"[Quick testimonial from beta user]\"\n\nOffer:\n🎁 Launch Special: [Discount/Bonus]\n⏰ Only available for [timeframe]\n\nCTA:\n\"Link in bio. Don't miss this.\"\n\nFOLLOW-UP (Day after):\n\"You all CRASHED our servers 🤯\"\n[Share launch metrics/testimonials]",
      caption_template: "It's finally here. 🚀\n\nAfter [timeframe] of development, we're thrilled to introduce [Product Name].\n\n[Product] helps you [core benefit] without [pain point].\n\n🎁 Launch offer: [Discount] for the first [number] customers\n\nLink in bio to get started 👆",
      hashtag_suggestions: ["#launch", "#newproduct", "#startup", "#entrepreneur", "#productlaunch"],
    },
    uses_count: 7654,
    rating: 4.7,
    is_premium: true,
    thumbnail_url: "/templates/product-launch.jpg",
    created_at: "2024-02-20",
  },
  {
    id: "t8",
    title: "Day in My Life Vlog",
    description: "Structured vlog template that balances entertainment with authentic storytelling.",
    category: "Vlogs",
    niche: "Lifestyle & Travel",
    platform: "youtube",
    content_type: "long-form",
    template_data: {
      hook_template: "This is what a day looks like when you [your unique situation/job/lifestyle]...",
      script_template: "COLD OPEN (0:00-0:30):\n[Start with the most exciting/interesting moment of the day]\n\"You won't believe what happened...\"\n\nMORNING ROUTINE (0:30-3:00):\n- Wake up shot with time stamp\n- Morning routine montage (gym, breakfast, etc.)\n- Voiceover: Share your mindset/goals for the day\n\nMID-MORNING (3:00-6:00):\n- Transition to work/activity\n- Show the real, unfiltered process\n- Talk about challenges you're facing\n\nLUNCH / BREAK (6:00-7:00):\n- Quick lifestyle segment\n- Meal prep or restaurant\n- Casual chat with viewers\n\nAFTERNOON HIGHLIGHTS (7:00-11:00):\n- Main activity or project\n- Build up to the climax moment\n- Include B-roll and time-lapses\n\nEVENING WIND-DOWN (11:00-13:00):\n- Reflect on the day\n- Evening routine\n- Share what you learned\n\nOUTRO (13:00-14:00):\n\"That's a wrap on today. If you enjoyed this, like and subscribe.\"\n[Tease tomorrow's content]",
      caption_template: "A day in my life as a [role/title] 🌅\n\nFrom early morning [activity] to evening [activity].\n\nThis is the reality of [your lifestyle] that nobody shows you.\n\nWhat does your typical day look like? 👇",
      hashtag_suggestions: ["#dayinmylife", "#vlog", "#lifestyle", "#routine", "#productivity"],
    },
    uses_count: 11234,
    rating: 4.5,
    is_premium: false,
    thumbnail_url: "/templates/ditl-vlog.jpg",
    created_at: "2024-03-01",
  },
  {
    id: "t9",
    title: "Newsletter Growth Engine",
    description: "Weekly newsletter template with engagement loops built in.",
    category: "Newsletters",
    niche: "Marketing & Social Media",
    platform: "newsletter",
    content_type: "article",
    template_data: {
      hook_template: "Subject: [Number/Emoji] [Curiosity hook about this week's topic]",
      script_template: "SUBJECT LINE:\n[Emoji] [Curiosity-driven subject line]\n\nPREVIEW TEXT:\n[Teaser that complements the subject]\n\nHEADER:\n📬 [Newsletter Name] — Issue #[Number]\n\nINTRO (2-3 sentences):\n\"Happy [Day], [first_name]!\n\nThis week, [topic tease]. Plus, I'm sharing [bonus].\"\n\nSECTION 1: Main Story/Insight\n📌 [Headline]\n[3-4 paragraphs of value]\n[Include a personal angle]\n\nSECTION 2: Actionable Tips\n⚡ Quick Wins This Week:\n1. [Tip with explanation]\n2. [Tip with explanation]\n3. [Tip with explanation]\n\nSECTION 3: Tool/Resource of the Week\n🛠️ [Tool Name]\n[Why it's useful, how you use it]\n[Affiliate link if applicable]\n\nSECTION 4: Creator Spotlight\n🌟 [Feature another creator or subscriber]\n\nCTA:\n💬 Reply and tell me: [Question]\n\nFOOTER:\nThanks for reading!\n[Sign off]\n\nP.S. [Teaser for next week or special offer]",
      caption_template: "New newsletter just dropped 📬\n\nThis week's issue:\n📌 [Topic 1]\n⚡ [Topic 2]\n🛠️ [Topic 3]\n\nJoin 10,000+ creators getting smarter every [day].\n\nLink in bio to subscribe (it's free) 👆",
      hashtag_suggestions: ["#newsletter", "#emailmarketing", "#contentcreator", "#creatoreconomy"],
    },
    uses_count: 6543,
    rating: 4.8,
    is_premium: true,
    thumbnail_url: "/templates/newsletter.jpg",
    created_at: "2024-03-05",
  },
  {
    id: "t10",
    title: "Controversial Take Thread",
    description: "Designed to spark debate and go viral with strong opinions.",
    category: "Threads",
    niche: "Marketing & Social Media",
    platform: "twitter",
    content_type: "thread",
    template_data: {
      hook_template: "Unpopular opinion: [Bold claim about your industry]\n\nAnd I have receipts to prove it 🧵",
      script_template: "TWEET 1:\nUnpopular opinion: [Bold contrarian claim]\n\nAnd I have the receipts to prove it.\n\n🧵\n\nTWEET 2:\nEveryone says you should [common advice].\n\nI did the opposite.\n\nHere's what happened:\n\nTWEET 3-6:\n[Present your argument with evidence]\n[Use data, screenshots, or examples]\n[Address counterarguments]\n\nTWEET 7:\n\"But [common objection]!\"\n\nFair point. Here's why it still works:\n[Counter]\n\nTWEET 8:\nThe data doesn't lie:\n\n📊 [Stat 1]\n📈 [Stat 2]\n💰 [Stat 3]\n\nTWEET 9:\nSo what should you do instead?\n\n1. [Action 1]\n2. [Action 2]\n3. [Action 3]\n\nTWEET 10:\nAgree or disagree?\n\nDrop your hottest take below 👇\n\n(And follow @[handle] for more [topic] insights that go against the grain)",
      caption_template: "",
      hashtag_suggestions: ["#unpopularopinion", "#hottake", "#debate", "#marketing"],
    },
    uses_count: 18765,
    rating: 4.6,
    is_premium: false,
    thumbnail_url: "/templates/controversial.jpg",
    created_at: "2024-03-10",
  },
];

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    slug: "10x-your-content-output-with-ai",
    title: "How to 10x Your Content Output with AI (Without Losing Your Voice)",
    excerpt: "Discover the framework top creators use to leverage AI for content production while maintaining their unique brand voice and authenticity.",
    content: `The creator economy is evolving faster than ever. In 2024, creators who aren't leveraging AI tools are being left behind — but those who rely on AI completely are losing what makes them special.

The sweet spot? Using AI as your creative co-pilot, not your replacement.

## The 10x Framework

After working with over 500 creators, I've developed what I call the "10x Framework" for AI-assisted content creation:

### 1. Ideation Amplification
Instead of staring at a blank page, use AI to generate 50 content ideas in seconds. But here's the key — filter them through your unique perspective. Ask yourself: "Which of these would ONLY I talk about this way?"

### 2. Structure, Don't Script
Let AI create outlines and structures, but write the actual content in your voice. Your audience follows you for YOUR stories, YOUR opinions, YOUR humor. AI can't replicate that.

### 3. The 80/20 Edit Rule
Let AI handle the 80% (research, formatting, hashtags, SEO) while you focus on the 20% that matters most (hooks, stories, insights, personality).

### 4. Batch Production
Use AI to create content packages — multiple pieces from one idea. A YouTube video becomes a blog post, becomes 5 tweets, becomes an Instagram carousel, becomes a newsletter. What used to take a week now takes a day.

### 5. Quality Control Loop
Always run AI-generated content through your personal filter. Read it out loud. Does it sound like you? Would your biggest fan recognize your voice? If not, rewrite it.

## The Numbers Don't Lie

Creators using this framework report:
- 3-5x more content published per week
- 40% reduction in content creation time
- 15% increase in engagement (because they have more time for community)
- 0% decrease in authenticity scores (as rated by their audience)

## Getting Started

The best way to start is to pick ONE type of content and experiment with AI assistance for a week. Track your output and quality. Iterate from there.

Remember: AI is a tool, not a replacement. The best content will always come from real human experiences, emotions, and perspectives — enhanced by technology, not replaced by it.

Your voice matters. AI just helps it reach more people.`,
    cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    author: "Sarah Chen",
    author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    category: "AI & Content",
    tags: ["AI", "Content Creation", "Productivity", "Creator Economy"],
    read_time: 6,
    published_at: "2024-03-15",
    updated_at: "2024-03-15",
  },
  {
    id: "bp2",
    slug: "content-calendar-strategy-2024",
    title: "The Ultimate Content Calendar Strategy for 2024",
    excerpt: "Stop posting randomly. Learn the data-driven content calendar strategy that top creators use to grow consistently across all platforms.",
    content: `If you're posting content without a calendar, you're leaving growth on the table.

A content calendar isn't just about organization — it's about strategy. Here's how the top 1% of creators plan their content for maximum impact.

## Why Most Content Calendars Fail

The biggest mistake creators make is treating their calendar like a to-do list. Post on Monday. Post on Wednesday. Post on Friday. Check, check, check.

But a great content calendar is a growth engine. It accounts for:
- Platform algorithms and optimal posting times
- Content pillar rotation
- Audience engagement patterns
- Seasonal trends and cultural moments
- Repurposing workflows

## The 4-Pillar Content System

Every piece of content you create should fall into one of four pillars:

### Pillar 1: Educational Content (40%)
Teach your audience something valuable. This builds trust and authority.

### Pillar 2: Entertaining Content (25%)
Make people laugh, think, or feel something. This drives shares and new audience.

### Pillar 3: Inspirational Content (20%)
Share stories, wins, and transformations. This builds emotional connection.

### Pillar 4: Promotional Content (15%)
Direct calls-to-action for your products, services, or affiliate offers. This drives revenue.

## The Weekly Rhythm

Here's a sample weekly calendar structure:

**Monday:** Educational long-form (YouTube/Blog)
**Tuesday:** Behind-the-scenes (Stories/TikTok)
**Wednesday:** Carousel or thread (Instagram/Twitter)
**Thursday:** Community Q&A (Live/Stories)
**Friday:** Entertaining short-form (Reels/TikTok)
**Saturday:** Inspirational story (All platforms)
**Sunday:** Weekly newsletter + content planning for next week

## AI-Powered Optimization

Use AI tools to analyze your best-performing content and suggest optimal posting times. Content.ai's calendar feature does this automatically, analyzing your audience's online patterns and recommending the best slots.

The result? More consistent posting, better engagement, and exponential growth.`,
    cover_image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop",
    author: "Marcus Johnson",
    author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    category: "Strategy",
    tags: ["Content Calendar", "Strategy", "Planning", "Growth"],
    read_time: 8,
    published_at: "2024-03-10",
    updated_at: "2024-03-10",
  },
  {
    id: "bp3",
    slug: "hook-writing-masterclass",
    title: "Hook Writing Masterclass: 5 Formulas That Stop the Scroll",
    excerpt: "Your hook is everything. Learn the 5 proven hook formulas that top creators use to capture attention in the first 3 seconds.",
    content: `You have 3 seconds. That's it.

In those 3 seconds, your audience decides whether to keep watching, reading, or scrolling past your content forever.

No pressure, right?

After analyzing over 10,000 viral pieces of content across YouTube, TikTok, Instagram, and Twitter, I've identified 5 hook formulas that consistently outperform everything else.

## Formula #1: The Controversial Take

"Everyone says [common advice] — they're wrong."

This works because it triggers a psychological response. People either agree passionately or want to prove you wrong. Either way, they're engaged.

Examples:
- "Posting daily on Instagram is killing your growth"
- "The 4-hour workweek is a lie, and here's proof"
- "You don't need 10,000 followers to make $10K/month"

## Formula #2: The Curiosity Gap

"I discovered [interesting thing] and it [surprising result]"

Humans are hardwired to close information gaps. When you tease something without revealing it, people HAVE to know more.

Examples:
- "I added one sentence to my bio and gained 10K followers in a month"
- "This free tool replaced my entire $500/month tech stack"
- "The #1 reason your content isn't growing (it's not what you think)"

## Formula #3: The Story Hook

"Two years ago, I was [relatable struggle]..."

Stories are the oldest form of human communication. When you start with a story, you activate the narrative part of the brain, making your content irresistible.

Examples:
- "I was $50K in debt with zero followers. Here's what happened next..."
- "My boss fired me on a Tuesday. By Friday, I'd made my first $1,000 online"
- "Three years ago, I couldn't get 10 views. Last week, I hit 1 million"

## Formula #4: The Shocking Stat

"[Surprising number] of [people/things] [do/are] [surprising fact]"

Numbers are concrete and credible. When a stat challenges assumptions, it creates instant engagement.

Examples:
- "97% of content creators never earn a full-time income"
- "The average TikTok user opens the app 19 times a day"
- "Creators with 1,000 followers make more per follower than those with 1M"

## Formula #5: The Direct Question

"Have you ever [relatable experience]?"

Questions force the brain to answer. They create an immediate personal connection between you and your audience.

Examples:
- "Have you ever spent 3 hours on a post that got 12 likes?"
- "What would you do with an extra 10 hours per week?"
- "Why do some creators blow up while others stay stuck?"

## How to Use These Formulas

The key is to mix and match. Don't use the same formula every time. Rotate through all five to keep your content fresh and unpredictable.

Start every piece of content by writing 5 hooks — one in each style. Then pick the strongest one. This alone will transform your content performance.`,
    cover_image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop",
    author: "Emma Rodriguez",
    author_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    category: "Writing",
    tags: ["Hooks", "Copywriting", "Viral Content", "Writing Tips"],
    read_time: 7,
    published_at: "2024-03-05",
    updated_at: "2024-03-05",
  },
];

export const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "YouTube Creator, 2.3M subscribers",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "Content.ai cut my content creation time in half. I went from posting twice a week to daily, and my channel grew 340% in 6 months.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Instagram Creator, 890K followers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    content: "The hook generator is insane. Every reel I make now gets at least 50% more views because my hooks are actually stopping the scroll.",
    rating: 5,
  },
  {
    name: "Jordan Mitchell",
    role: "Content Agency Owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "We manage 15 creator accounts. The Agency plan with the content calendar and analytics saves us 40+ hours per week. Best investment we've made.",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "TikTok Creator, 1.5M followers",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    content: "I was skeptical about AI-generated content, but Content.ai gets my voice. The scripts feel like ME, just faster. My audience can't even tell.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Podcast Host, Top 50 in Business",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    content: "The template library alone is worth the subscription. I use the podcast episode template every single week. My prep time went from 4 hours to 45 minutes.",
    rating: 5,
  },
  {
    name: "Rachel Foster",
    role: "Newsletter Creator, 45K subscribers",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    content: "The content calendar with AI posting time suggestions helped me find my audience's sweet spot. My open rates jumped from 22% to 41% in two months.",
    rating: 5,
  },
];

export const STATS = [
  { label: "Content Pieces Generated", value: "2.4M+", icon: "📝" },
  { label: "Active Creators", value: "50K+", icon: "🎨" },
  { label: "Hours Saved Weekly", value: "15+", icon: "⏱" },
  { label: "Avg. Engagement Increase", value: "340%", icon: "📈" },
];
