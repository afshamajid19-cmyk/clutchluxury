import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Settings {
  brand_name: string;
  whatsapp_number: string;
  whatsapp_link: string;
  instagram_url: string;
  threads_url: string;
  linktree_url: string;
  disclaimer_text: string;
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
