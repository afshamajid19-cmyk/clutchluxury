import type { Metadata } from "next";
import HermesColorGuide from "@/app_components/guides/HermesColorGuide";

export const metadata: Metadata = {
  title: "Hermes Color Guide",
  description:
    "Learn how Hermes colors work, how collectors read them, and which shades drive desirability and resale value.",
};

export default function HermesColorGuidePage() {
  return <HermesColorGuide />;
}
