import { cache } from "react";
import { getJsonCatalog } from "@/lib/providers/json-provider";
import { getShopifyCatalog } from "@/lib/providers/shopify-provider";
import { isShopifyConfigured } from "@/lib/shopify/client";
import type { Product } from "@/lib/types";

export const getCatalog = cache(async () => {
  if (isShopifyConfigured()) {
    try {
      return await getShopifyCatalog();
    } catch {
      return getJsonCatalog();
    }
  }

  return getJsonCatalog();
});

export async function getFeaturedProducts(limit = 8) {
  const catalog = await getCatalog();
  return catalog.products.filter((product) => Boolean(product.isFeatured)).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const catalog = await getCatalog();
  return catalog.products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(category: string) {
  const catalog = await getCatalog();
  if (!category) {
    return catalog.products;
  }

  return catalog.products.filter((product) => product.category === category);
}
