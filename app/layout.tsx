import type { Metadata } from "next";
import "@/app/globals.css";
import { brandConfig } from "@/lib/brand-config";

export const metadata: Metadata = {
  title: `${brandConfig.name} | ${brandConfig.tagline}`,
  description: brandConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-brand={brandConfig.key}>{children}</body>
    </html>
  );
}
