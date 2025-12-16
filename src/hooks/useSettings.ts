import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Settings {
  brand_name: string;
  whatsapp_number: string;
  whatsapp_link: string;
  instagram_url: string;
  threads_url: string;
  linktree_url: string;
  disclaimer_text: string;
  items_sheet_url?: string;
  requests_webhook_url?: string;
}

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async (): Promise<Settings> => {
      const { data, error } = await supabase
        .from("settings")
        .select("key, value");

      if (error) throw error;

      const settingsMap = data.reduce((acc, { key, value }) => {
        acc[key as keyof Settings] = value;
        return acc;
      }, {} as Settings);

      return settingsMap;
    },
  });
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      // Try to update first
      const { data: existing } = await supabase
        .from("settings")
        .select("key")
        .eq("key", key)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("settings")
          .update({ value })
          .eq("key", key);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("settings")
          .insert({ key, value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Settings>) => {
      const entries = Object.entries(updates);
      
      for (const [key, value] of entries) {
        if (value === undefined) continue;
        
        const { data: existing } = await supabase
          .from("settings")
          .select("key")
          .eq("key", key)
          .single();

        if (existing) {
          const { error } = await supabase
            .from("settings")
            .update({ value: value as string })
            .eq("key", key);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("settings")
            .insert({ key, value: value as string });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}
