"use client";

import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/site/product-card";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { PageHeader } from "@/components/pages/page-header";
import { Card } from "@/components/ui/card";

export function WishlistPage({ products }: { products: Product[] }) {
  const { ids } = useWishlist();
  const items = products.filter((product) => ids.includes(product.id));

  return (
    <div className="space-y-8">
      <PageHeader title="Wishlist" description="Your saved items are ready whenever you are." eyebrow="Saved" />
      {items.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600">No saved products yet. Tap the heart icon on any product card.</p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
