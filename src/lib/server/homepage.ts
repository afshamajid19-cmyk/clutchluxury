import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SITE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/env";

export type HomepageSettings = {
  brand_name?: string;
  whatsapp_link?: string;
  instagram_url?: string;
  threads_url?: string;
  linktree_url?: string;
  disclaimer_text?: string;
};

export type HomepageTrendingItem = {
  id: string;
  image_url: string;
  title: string | null;
  source_attribution: string | null;
  is_active: boolean | null;
  display_order: number | null;
};

export type HomepageZohoItem = {
  id: string;
  brand: string;
  item_name: string;
  category: string;
  hero_image_url: string | null;
};

function getServerSupabase() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return null;
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getHomepageData() {
  const supabase = getServerSupabase();

  if (!supabase) {
    return {
      settings: null,
      trendingItems: [],
      zohoItems: [],
    };
  }

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
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Unable to load Zoho trending items.");
      }

      return response.json();
    }),
  ]);

  const settings =
    settingsResult.status === "fulfilled" && !settingsResult.value.error
      ? settingsResult.value.data.reduce((acc, item) => {
          acc[item.key as keyof HomepageSettings] = item.value;
          return acc;
        }, {} as HomepageSettings)
      : null;

  const trendingItems =
    trendingResult.status === "fulfilled" && !trendingResult.value.error
      ? (trendingResult.value.data as HomepageTrendingItem[])
      : [];

  const zohoItems =
    zohoResult.status === "fulfilled"
      ? ((zohoResult.value?.items ?? []) as HomepageZohoItem[])
      : [];

  return {
    settings,
    trendingItems,
    zohoItems,
    canonicalUrl: SITE_URL,
  };
}
