import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory token cache
let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getZohoAccessToken(): Promise<string> {
  // Return cached token if still valid (55 min buffer)
  if (cachedToken && Date.now() < cachedToken.expires_at) {
    return cachedToken.access_token;
  }

  const clientId = Deno.env.get("ZOHO_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOHO_CLIENT_SECRET");
  const refreshToken = Deno.env.get("ZOHO_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Zoho API credentials");
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Zoho token request failed [${res.status}]: ${body}`);
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Zoho token response missing access_token: ${JSON.stringify(data)}`);
  }

  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + 55 * 60 * 1000, // 55 minutes
  };

  return data.access_token;
}

function extractBrand(name: string): string {
  // Common luxury brands to match at the start of item names
  const brands = [
    "Hermès", "Hermes", "HERMÈS", "HERMES",
    "Chanel", "CHANEL",
    "Louis Vuitton", "LOUIS VUITTON",
    "Dior", "DIOR",
    "Gucci", "GUCCI",
    "Prada", "PRADA",
    "Bottega Veneta", "BOTTEGA VENETA",
    "Celine", "CELINE", "Céline", "CÉLINE",
    "Loro Piana", "LORO PIANA",
    "Fendi", "FENDI",
    "Cartier", "CARTIER",
    "Rolex", "ROLEX",
    "Patek Philippe", "PATEK PHILIPPE",
    "Van Cleef", "VAN CLEEF",
    "Tiffany", "TIFFANY",
    "Valentino", "VALENTINO",
    "Saint Laurent", "SAINT LAURENT", "YSL",
    "Balenciaga", "BALENCIAGA",
    "Jimmy Choo", "JIMMY CHOO",
    "Loewe", "LOEWE",
    "Goyard", "GOYARD",
    "Bulgari", "BULGARI", "Bvlgari", "BVLGARI",
  ];

  const lowerName = name.toLowerCase();
  for (const brand of brands) {
    if (lowerName.startsWith(brand.toLowerCase())) {
      return brand.toUpperCase();
    }
  }

  // Fallback: first word
  return name.split(" ")[0].toUpperCase();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = await getZohoAccessToken();
    const orgId = Deno.env.get("ZOHO_ORGANIZATION_ID");

    if (!orgId) {
      throw new Error("Missing ZOHO_ORGANIZATION_ID");
    }

    const res = await fetch(
      `https://www.zohoapis.com/inventory/v1/items?organization_id=${orgId}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Zoho items fetch failed [${res.status}]: ${body}`);
    }

    const data = await res.json();
    const allItems = data.items || [];

    // Filter for items tagged "trending" with images
    const trendingItems = allItems
      .filter((item: any) => {
        const tags: string[] = item.tags || [];
        const hasTrending = tags.some(
          (t: string) => t.toLowerCase() === "trending"
        );
        const hasImage = !!(item.image_url || item.image_name);
        return hasTrending && hasImage;
      })
      .map((item: any) => ({
        id: item.item_id,
        item_name: item.name,
        brand: extractBrand(item.name),
        category: (item.category_name || "LUXURY ITEM").toUpperCase(),
        hero_image_url: item.image_url || null,
      }));

    return new Response(JSON.stringify({ items: trendingItems }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Zoho trending items error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ items: [], error: message }),
      {
        status: 200, // Return 200 with empty items so frontend can use fallback
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
