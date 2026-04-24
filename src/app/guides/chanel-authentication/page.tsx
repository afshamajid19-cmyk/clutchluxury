import type { Metadata } from "next";
import ChanelAuthentication from "@/app_components/guides/ChanelAuthentication";

export const metadata: Metadata = {
  title: "How to Authenticate a Chanel Bag",
  description:
    "Learn how to spot real vs fake Chanel details including quilting, hardware, stitching, and interior markers.",
};

export default function ChanelAuthenticationPage() {
  return <ChanelAuthentication />;
}
