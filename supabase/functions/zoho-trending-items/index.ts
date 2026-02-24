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

function cleanItemName(rawName: string): string {
  let cleaned = rawName;
  // Remove long digit sequences (SKU codes) and trailing patterns like "----BAG- 136"
  cleaned = cleaned.replace(/\d{10,}[-\s]*[A-Z]*[-\s]*\d*/g, '');
  // Remove trailing dashes, spaces, and category suffixes
  cleaned = cleaned.replace(/[-–—]+\s*[A-Z]*[-\s]*\d*\s*$/g, '');
  // Remove hardware codes glued to digits e.g. "PHW4906..." or "GHW4906..."
  cleaned = cleaned.replace(/(PHW|GHW|SHW|RGHW)\d+/gi, '$1');
  return cleaned.replace(/\s+/g, ' ').trim();
}

function extractBrand(name: string): string {
  const brandPrefixes: [string, string][] = [
    ["Hermès", "HERMÈS"], ["Hermes", "HERMÈS"],
    ["Birkin", "HERMÈS"], ["Kelly", "HERMÈS"], ["Picotin", "HERMÈS"], ["Constance", "HERMÈS"], ["Evelyne", "HERMÈS"], ["Bolide", "HERMÈS"], ["Garden Party", "HERMÈS"], ["Lindy", "HERMÈS"],
    ["Mini Kelly", "HERMÈS"], ["Mini Lindy", "HERMÈS"],
    ["Chanel", "CHANEL"], ["C25", "CHANEL"], ["C19", "CHANEL"], ["Classic Flap", "CHANEL"], ["Boy", "CHANEL"], ["Gabrielle", "CHANEL"],
    ["Louis Vuitton", "LOUIS VUITTON"], ["LV", "LOUIS VUITTON"],
    ["Dior", "DIOR"], ["Lady Dior", "DIOR"],
    ["Gucci", "GUCCI"],
    ["Prada", "PRADA"],
    ["Bottega Veneta", "BOTTEGA VENETA"],
    ["Celine", "CELINE"], ["Céline", "CÉLINE"],
    ["Loro Piana", "LORO PIANA"],
    ["Fendi", "FENDI"], ["Peekaboo", "FENDI"], ["Baguette", "FENDI"],
    ["Cartier", "CARTIER"],
    ["Rolex", "ROLEX"],
    ["Patek Philippe", "PATEK PHILIPPE"],
    ["Van Cleef", "VAN CLEEF & ARPELS"],
    ["Tiffany", "TIFFANY"],
    ["Valentino", "VALENTINO"],
    ["Saint Laurent", "SAINT LAURENT"], ["YSL", "SAINT LAURENT"],
    ["Balenciaga", "BALENCIAGA"],
    ["Jimmy Choo", "JIMMY CHOO"],
    ["Loewe", "LOEWE"], ["Puzzle", "LOEWE"],
    ["Goyard", "GOYARD"],
    ["Bulgari", "BULGARI"], ["Bvlgari", "BULGARI"],
  ];

  const lowerName = name.toLowerCase();
  for (const [prefix, brand] of brandPrefixes) {
    if (lowerName.startsWith(prefix.toLowerCase())) {
      return brand;
    }
  }
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

    console.log("=== ZOHO TRENDING ITEMS DEBUG ===");
    console.log("Total items fetched:", allItems.length);
    console.log("First 3 items sample:", JSON.stringify(allItems.slice(0, 3).map((i: any) => ({
      name: i.name,
      cf_trending: i.cf_trending,
      image_url: i.image_url,
      image_name: i.image_name,
      image_document_id: i.image_document_id,
    }))));

    // Filter for items with cf_trending custom field enabled
    const trendingItems = allItems
      .filter((item: any) => {
        const v = item.cf_trending;
        const isTrending = v === true || v === "true" || v === "True" || v === "TRUE" ||
          v === "Yes" || v === "yes" || v === "YES" || v === 1;
        return isTrending;
      })
      .map((item: any) => {
        let imageUrl = item.image_url || null;
        if (!imageUrl && (item.image_document_id || item.image_name)) {
          imageUrl = `https://www.zohoapis.com/inventory/v1/items/${item.item_id}/image`;
        }
        return {
          id: item.item_id,
          item_name: cleanItemName(item.name),
          brand: extractBrand(item.name),
          category: (item.category_name || "LUXURY ITEM").toUpperCase(),
          hero_image_url: imageUrl,
        };
      });

    console.log("Items marked as trending:", trendingItems.length);
    console.log("Trending items:", JSON.stringify(trendingItems.map(i => ({ name: i.item_name, image: i.hero_image_url }))));
    console.log("=== END DEBUG ===");

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
