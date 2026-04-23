import type { Metadata } from "next";
import HermesLeatherTypes from "@/pages/guides/HermesLeatherTypes";

export const metadata: Metadata = {
  title: "How to Identify Hermes Leather Types",
  description:
    "A guide to understanding the leathers that define Hermes craftsmanship, from Togo and Clemence to exotic skins.",
};

export default function HermesLeatherTypesPage() {
  return <HermesLeatherTypes />;
}
