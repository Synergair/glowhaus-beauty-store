"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/pages/page-header";
import { Card } from "@/components/ui/card";
import { brandConfig } from "@/lib/brand-config";
import type { Category, Product } from "@/lib/types";

const glowConcernFilters = ["Fine Lines", "Acne", "Dark Spots", "Texture", "Pores", "Barrier"];
const vitalRootCauseFilters = ["Stress", "Nutrition", "Aging", "Hormones", "Lifestyle", "Metabolism", "Scalp Care"];

export function CollectionPage({
  products,
  categories,
  initialCategory
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [category, setCategory] = React.useState(initialCategory ?? "all");
  const [sort, setSort] = React.useState("featured");
  const [query, setQuery] = React.useState("");
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  const filtered = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    const byCategory =
      category === "all" ? products : products.filter((product) => product.category === category);

    const byAvailability = inStockOnly
      ? byCategory.filter((product) => Number(product.stock ?? 0) > 0)
      : byCategory;

    const bySearch = search
      ? byAvailability.filter((product) =>
          `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search)
        )
      : byAvailability;

    if (sort === "price-asc") {
      return [...bySearch].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...bySearch].sort((a, b) => b.price - a.price);
    }
    if (sort === "rating") {
      return [...bySearch].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return bySearch;
  }, [category, inStockOnly, products, query, sort]);

  const taxonomies = isGlowhaus ? glowConcernFilters : vitalRootCauseFilters;

  return (
    <div className="space-y-8">
      <PageHeader
        title={isGlowhaus ? "Shop by Concern" : "Shop by Root Cause"}
        description={
          isGlowhaus
            ? "SONAR-inspired beauty discovery: concern-first merchandising with high-signal filters and fast add-to-cart."
            : "SONAR-inspired wellness discovery: root-cause segmentation, results framing, and efficient product lookup."
        }
        eyebrow="Collection"
      />

      <div className="flex flex-wrap gap-2">
        {taxonomies.map((item) => (
          <Badge key={item} className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-slate-700">
            {item}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit space-y-5 border-black/10 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Refine results</h2>

          <div className="space-y-2">
            <Label htmlFor="collection-search" className="text-xs uppercase tracking-[0.12em] text-slate-500">
              Search
            </Label>
            <Input
              id="collection-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isGlowhaus ? "Product, ingredient, concern" : "Product, benefit, root cause"}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.12em] text-slate-500">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.slug}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.12em] text-slate-500">Sort</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-black/10 bg-slate-50 px-3 py-2">
            <Label htmlFor="stock-only" className="text-sm text-slate-700">
              In-stock only
            </Label>
            <Switch id="stock-only" checked={inStockOnly} onCheckedChange={setInStockOnly} />
          </div>

          <Link href="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-black">
            Advanced search
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--brand-accent-soft)] px-4 py-3">
            <p className="text-sm font-semibold text-slate-700">{filtered.length} results</p>
            <Badge className="rounded-full border border-black/10 bg-white text-[11px] uppercase tracking-[0.14em] text-slate-600">
              SONAR discovery rail
            </Badge>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
