import type { Metadata } from "next";
import HermesAuthentication from "@/app_components/guides/HermesAuthentication";

export const metadata: Metadata = {
  title: "How to Authenticate a Hermes Bag",
  description:
    "A practical real-vs-fake guide covering stamps, hardware, construction details, and common Hermes warning signs.",
};

export default function HermesAuthenticationPage() {
  return <HermesAuthentication />;
}
