import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Item {
  id: string;
  created_at: string;
  brand: string;
  item_name: string;
  category: string;
  description: string | null;
  availability_status: string;
  price_hint: string | null;
  hero_image_url: string | null;
  gallery_urls: string[] | null;
  enquiry_enabled: boolean | null;
}

export function useItems(filters?: {
  availability_status?: string;
  category?: string;
}) {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: async (): Promise<Item[]> => {
      let query = supabase
        .from("items")
        .select("*")
        .eq("enquiry_enabled", true)
        .order("created_at", { ascending: false });

      if (filters?.availability_status && filters.availability_status !== "all") {
        query = query.eq("availability_status", filters.availability_status);
      }

      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });
}

export function useAllItems() {
  return useQuery({
    queryKey: ["all-items"],
    queryFn: async (): Promise<Item[]> => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
}
