# 1. Migration Summary

- The site is moving from a browser-only React app to a Next.js app that can build pages on the server before they reach Google or the visitor.
- The homepage is now designed to render on the server, which helps search engines read the content faster and more reliably.
- The new setup keeps the visual design and main sections, but reorganizes the code into a cleaner structure that is easier to grow and maintain.
- Heavy interactive pieces stay interactive, but they are loaded more carefully so the first page load feels lighter.

# 2. Technical Migration Plan

## Step-by-step approach

1. Replace the Vite entrypoints with Next.js App Router entrypoints.
2. Move route ownership from `react-router-dom` into `src/app/**/page.tsx`.
3. Keep reusable UI in `src/components`.
4. Keep shared browser hooks in `src/hooks`.
5. Add server-side data utilities for homepage data in `src/lib/server`.
6. Use server rendering for the homepage and client islands only where interactivity is needed.
7. Keep admin flows client-rendered because they depend on browser storage, uploads, and dashboard interactions.

## Folder structure before

```text
src/
  App.tsx
  main.tsx
  pages/
    Index.tsx
    Admin.tsx
    TrendingUpload.tsx
    guides/*
  components/
    landing/*
    guides/*
    ui/*
  hooks/*
  integrations/supabase/*
```

## Folder structure after

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    robots.ts
    sitemap.ts
    admin/page.tsx
    admin/trending-upload/page.tsx
    guides/*/page.tsx
    providers.tsx
  components/
    landing/*
    guides/*
    ui/*
  hooks/*
  lib/
    env.ts
    server/homepage.ts
  integrations/supabase/*
  pages/
    Admin.tsx
    TrendingUpload.tsx
    guides/*
```

## Routing changes

| React route | Next.js route file |
|---|---|
| `/` | `src/app/page.tsx` |
| `/admin` | `src/app/admin/page.tsx` |
| `/admin/trending-upload` | `src/app/admin/trending-upload/page.tsx` |
| `/guides/hermes-leather-types` | `src/app/guides/hermes-leather-types/page.tsx` |
| `/guides/hermes-color-guide` | `src/app/guides/hermes-color-guide/page.tsx` |
| `/guides/hermes-date-stamps` | `src/app/guides/hermes-date-stamps/page.tsx` |
| `/guides/quota-vs-non-quota-bags` | `src/app/guides/quota-vs-non-quota-bags/page.tsx` |
| `/guides/hermes-authentication` | `src/app/guides/hermes-authentication/page.tsx` |
| `/guides/chanel-authentication` | `src/app/guides/chanel-authentication/page.tsx` |
| catch-all 404 | `src/app/not-found.tsx` |

## Data fetching changes

- Homepage data now comes from `src/lib/server/homepage.ts`.
- Settings and trending items are fetched on the server before the homepage is sent to the browser.
- Interactive sections still hydrate on the client, but they start with server-provided data so they do not begin empty.
- Admin pages continue using client-side Supabase calls because they rely on uploads, local session flags, and mutations.

## Rendering strategy by page type

- Homepage: server-rendered on every request using App Router server component pattern.
- Guide pages: static route files with normal rendering and metadata.
- Admin pages: client-rendered inside Next.js route files.
- 404 page: framework-level Next.js `not-found` page.

# 3. Homepage SSR Implementation

## Router choice

- This migration uses the **Next.js App Router**.
- The homepage uses a **server component** in `src/app/page.tsx`.

## Page file

```tsx
// src/app/page.tsx
import type { Metadata } from "next";
import { HomePageShell } from "@/components/landing/HomePageShell";
import { SITE_URL } from "@/lib/env";
import { getHomepageData } from "@/lib/server/homepage";

export const dynamic = "force-dynamic";

const homepageTitle = "CLUTCH | Pre-Owned Hermes and Luxury Bags | Dubai";
const homepageDescription =
  "Dubai's trusted source for authenticated pre-owned Hermes, Chanel, and luxury handbags with personal sourcing and worldwide delivery.";

export const metadata: Metadata = {
  title: homepageTitle,
  description: homepageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/clutch-logo-ccc.jpg`,
        width: 1200,
        height: 630,
        alt: "CLUTCH luxury sourcing",
      },
    ],
  },
};

export default async function HomePage() {
  const homepageData = await getHomepageData();

  return <HomePageShell {...homepageData} />;
}
```

## Supporting server data logic

```tsx
// src/lib/server/homepage.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/env";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function getHomepageData() {
  const [settingsResult, trendingResult, zohoResult] = await Promise.allSettled([
    supabase.from("settings").select("key, value"),
    supabase
      .from("trending_items")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    fetch(`${SUPABASE_URL}/functions/v1/zoho-trending-items`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      next: { revalidate: 300 },
    }).then((response) => response.json()),
  ]);

  return {
    settings:
      settingsResult.status === "fulfilled" && !settingsResult.value.error
        ? settingsResult.value.data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {} as Record<string, string>)
        : null,
    trendingItems:
      trendingResult.status === "fulfilled" && !trendingResult.value.error
        ? trendingResult.value.data ?? []
        : [],
    zohoItems:
      zohoResult.status === "fulfilled" ? zohoResult.value?.items ?? [] : [],
  };
}
```

## Why this is the recommended App Router approach

- The page itself stays server-first.
- Only the interactive homepage shell and interactive sections hydrate in the browser.
- That gives search engines a complete homepage without waiting for client-side data loading.

# 4. SEO Improvements

## What was added

- Page title: tells search engines and users what the page is about.
- Meta description: improves the search result summary.
- Canonical URL: helps avoid duplicate-page confusion.
- Open Graph tags: improves how the homepage looks when shared on WhatsApp, Facebook, or LinkedIn.
- Twitter card metadata: improves large-image previews on social platforms that use Twitter tags.
- Structured data: gives Google a clearer machine-readable description of the business and FAQ content.
- `robots.ts` and `sitemap.ts`: gives crawlers clearer instructions and a reliable route list.

## Homepage metadata example

```tsx
export const metadata: Metadata = {
  title: "CLUTCH | Pre-Owned Hermes and Luxury Bags | Dubai",
  description:
    "Dubai's trusted source for authenticated pre-owned Hermes, Chanel, and luxury handbags with personal sourcing and worldwide delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CLUTCH | Pre-Owned Hermes and Luxury Bags | Dubai",
    description:
      "Dubai's trusted source for authenticated pre-owned Hermes, Chanel, and luxury handbags with personal sourcing and worldwide delivery.",
    url: SITE_URL,
    type: "website",
    images: [`${SITE_URL}/images/clutch-logo-ccc.jpg`],
  },
};
```

## Simple explanation

- Title: helps Google understand the page topic.
- Description: helps people decide to click.
- Canonical: tells search engines which version is the main one.
- Open Graph: makes sharing links look polished.
- Structured data: gives Google extra context in a format it understands quickly.

# 5. Performance Improvements

## Applied optimizations

- Server-rendered homepage:
  The visitor and Google receive real HTML immediately instead of waiting for browser-side rendering.
- Client islands:
  Only interactive sections hydrate in the browser, reducing unnecessary JavaScript on first load.
- Dynamic imports for heavy homepage sections:
  `TrendingCarousel` and `TrendingNow` are split into separate chunks so the first bundle is smaller.
- Next.js image handling:
  Key visual components were moved toward `next/image`, which improves sizing and loading behavior.
- Next font loading:
  The layout now uses `next/font/google`, which reduces render-blocking font work and improves consistency.
- Centralized server data utility:
  Homepage data fetching is now grouped in one server module, which makes caching and monitoring easier later.
- Built-in `robots` and `sitemap` routes:
  Search crawlers can discover the site more reliably without extra manual files.

## Expected impact

- Faster first meaningful paint on the homepage.
- Better search-engine crawlability.
- Less client-side work before the page feels usable.
- Cleaner bundle structure for future growth.

# 6. Code Output

## Main files added or updated

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/providers.tsx`
- `src/app/not-found.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/admin/**`
- `src/app/guides/**`
- `src/lib/env.ts`
- `src/lib/server/homepage.ts`
- `src/components/landing/HomePageShell.tsx`
- `src/components/landing/Hero.tsx`
- `src/components/landing/TrendingCarousel.tsx`
- `src/components/landing/TrendingNow.tsx`
- `src/components/landing/GuidesInsights.tsx`
- `src/components/landing/Contact.tsx`
- `src/components/landing/Footer.tsx`
- `src/components/guides/GuideLayout.tsx`
- `src/integrations/supabase/client.ts`
- `package.json`
- `tsconfig.json`
- `next.config.mjs`

## Notes

- The migration keeps the existing visual sections and content structure.
- Admin behavior is intentionally still client-driven because it depends on file uploads and browser storage.
- The old Vite entry files remain in the repo as reference material, but Next.js now owns routing and rendering.

# 7. Non-Technical Explanation

- The old site mostly built the page inside the visitor's browser after it loaded. The new setup can prepare the homepage on the server first, so both people and Google get a complete page sooner.
- This is especially helpful for SEO because search engines can read the homepage headline, descriptions, and content without waiting for JavaScript to finish running.
- Next.js also helps performance by splitting large interactive features into smaller pieces, loading assets more carefully, and reducing how much browser work is needed on first visit.
- In simple terms: the new version should be easier to find, faster to open, and easier to maintain as the business grows.
