"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { contains, toggle } = useWishlist();
  const inWishlist = contains(product.id);

  return (
    <Card className="group overflow-hidden rounded-[24px] border-black/10 bg-white p-0 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#efefef]">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}

        <button
          type="button"
          onClick={() => toggle(product.id)}
          className="absolute right-3 top-3 rounded-full border border-black/10 bg-white/95 p-2 text-slate-700 shadow"
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {product.badges?.[0] ? (
          <p className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
            {product.badges[0]}
          </p>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] text-slate-700">
            {product.category}
          </Badge>
          {product.ecoScore ? (
            <Badge className="rounded-full border border-black/10 bg-white text-slate-700">Eco {product.ecoScore}</Badge>
          ) : null}
        </div>

        <div>
          <Link href={`/product/${product.slug}`} className="text-lg font-semibold text-black hover:underline">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-slate-600">{product.shortDescription ?? product.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-black">{formatCurrency(product.price, product.currency)}</p>
            {product.compareAtPrice ? (
              <p className="text-xs text-slate-500 line-through">
                {formatCurrency(product.compareAtPrice, product.currency)}
              </p>
            ) : null}
          </div>

          <Button variant="accent" onClick={() => void addItem(product)} className="gap-2 rounded-full px-4">
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>

        {(product.rating ?? 0) > 0 ? (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
            <span className="font-semibold text-slate-700">{Number(product.rating).toFixed(1)}</span>
            <span>({product.reviewCount ?? 0} reviews)</span>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
