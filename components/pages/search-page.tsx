"use client";

import * as React from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { brandConfig } from "@/lib/brand-config";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { ProductCard } from "@/components/site/product-card";
import { PageHeader } from "@/components/pages/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const glowTrending = ["dark spots", "retinol", "barrier", "fine lines", "niacinamide"];
const vitalTrending = ["hair growth", "stress", "hormones", "protein", "recovery"];

export function SearchPage({ products }: { products: Product[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  const categories = React.useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category))).sort();
  }, [products]);

  const matches = React.useMemo(() => {
    const value = query.trim().toLowerCase();
    const byCategory =
      category === "all" ? products : products.filter((product) => product.category === category);

    if (!value) {
      return byCategory.slice(0, 12);
    }

    return byCategory.filter((product) => {
      const haystack = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return haystack.includes(value);
    });
  }, [category, products, query]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Search"
        description={
          isGlowhaus
            ? "Find routines by concern, ingredient, and texture preference."
            : "Find products by root cause, goal, and recovery timeline."
        }
        eyebrow="Discovery"
      />

      <Card className="space-y-4 border-black/10 p-5">
        <Command className="rounded-xl border border-black/10">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={isGlowhaus ? "Search by name, ingredient, concern" : "Search by name, goal, root cause"}
          />
          <CommandList>
            <CommandEmpty>No matching products.</CommandEmpty>
            <CommandGroup heading="Quick Jump">
              {matches.slice(0, 6).map((product) => (
                <CommandItem key={product.id} value={product.name} onSelect={() => setQuery(product.name)}>
                  <Link href={`/product/${product.slug}`} className="w-full text-sm text-slate-700">
                    {product.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={category === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("all")}
          >
            All
          </Button>
          {categories.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={category === item ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(isGlowhaus ? glowTrending : vitalTrending).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-black/10 bg-[var(--brand-accent-soft)] px-4 py-3">
        <p className="text-sm font-semibold text-slate-700">{matches.length} results</p>
        <Badge className="rounded-full border border-black/10 bg-white text-slate-700">search_filters_results</Badge>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {matches.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
