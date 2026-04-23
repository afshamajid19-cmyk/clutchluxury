import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/admin",
    "/admin/trending-upload",
    "/guides/hermes-leather-types",
    "/guides/hermes-color-guide",
    "/guides/hermes-date-stamps",
    "/guides/quota-vs-non-quota-bags",
    "/guides/hermes-authentication",
    "/guides/chanel-authentication",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
