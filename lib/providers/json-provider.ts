import fallbackCatalog from "@/data/products.json";
import type { Catalog, Product } from "@/lib/types";

export function getJsonCatalog(): Catalog {
  const catalog = fallbackCatalog as Catalog;
  return {
    store: catalog.store,
    currency: catalog.currency,
    categories: catalog.categories,
    products: catalog.products
  };
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getJsonCatalog()
    .products.filter((product) => Boolean(product.isFeatured))
    .slice(0, limit);
}
