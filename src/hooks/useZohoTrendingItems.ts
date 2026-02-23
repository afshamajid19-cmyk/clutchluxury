import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ZohoTrendingItem {
  id: string;
  brand: string;
  item_name: string;
  category: string;
  hero_image_url: string | null;
}

const CACHE_KEY = "clutch_trending_cache";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function getCachedItems(): ZohoTrendingItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.items;
    }
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
  return null;
}

function setCachedItems(items: ZohoTrendingItem[]) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ items, timestamp: Date.now() })
    );
  } catch {
    // ignore
  }
}

export function useZohoTrendingItems() {
  return useQuery({
    queryKey: ["zoho-trending-items"],
    queryFn: async (): Promise<ZohoTrendingItem[]> => {
      // Check localStorage cache first
      const cached = getCachedItems();
      if (cached && cached.length > 0) {
        return cached;
      }

      const { data, error } = await supabase.functions.invoke(
        "zoho-trending-items"
      );

      if (error) {
        console.error("Zoho trending fetch error:", error);
        // Return cached items if available even if expired
        const stale = getCachedItems();
        if (stale) return stale;
        return [];
      }

      const items: ZohoTrendingItem[] = data?.items || [];
      if (items.length > 0) {
        setCachedItems(items);
      }
      return items;
    },
    staleTime: CACHE_DURATION,
    retry: 1,
  });
}
