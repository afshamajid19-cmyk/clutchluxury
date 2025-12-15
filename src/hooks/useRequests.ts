import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Request {
  id: string;
  created_at: string;
  full_name: string;
  whatsapp: string;
  email: string | null;
  location: string;
  request_type: string;
  brand: string;
  item_name: string;
  category: string;
  specs: string | null;
  budget_min: number | null;
  budget_max: number | null;
  currency: string | null;
  urgency: string;
  reference_links: string[] | null;
  consent: boolean;
  status: string | null;
  internal_notes: string | null;
  item_id: string | null;
}

export function useRequests(filters?: {
  status?: string;
  brand?: string;
  category?: string;
}) {
  return useQuery({
    queryKey: ["requests", filters],
    queryFn: async (): Promise<Request[]> => {
      let query = supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters?.brand) {
        query = query.ilike("brand", `%${filters.brand}%`);
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

export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Request>;
    }) => {
      const { data, error } = await supabase
        .from("requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
