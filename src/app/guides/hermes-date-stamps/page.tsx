import type { Metadata } from "next";
import HermesDateStamps from "@/app_components/guides/HermesDateStamps";

export const metadata: Metadata = {
  title: "How to Read Hermes Date Stamps",
  description:
    "Decode Hermes date stamps, craftsman marks, and production clues with this collector-friendly guide.",
};

export default function HermesDateStampsPage() {
  return <HermesDateStamps />;
}
