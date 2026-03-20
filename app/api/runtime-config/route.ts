import { NextResponse } from "next/server";
import { isShopifyConfigured } from "@/lib/shopify/client";

export async function GET() {
  return NextResponse.json({
    shopifyEnabled: isShopifyConfigured()
  });
}
