import type { Metadata } from "next";
import QuotaVsNonQuotaBags from "@/app_components/guides/QuotaVsNonQuotaBags";

export const metadata: Metadata = {
  title: "Quota Bags vs Non-Quota Bags",
  description:
    "Understand the difference between Hermes quota and non-quota bags and how that affects availability.",
};

export default function QuotaVsNonQuotaBagsPage() {
  return <QuotaVsNonQuotaBags />;
}
