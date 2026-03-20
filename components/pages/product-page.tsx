"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { brandConfig } from "@/lib/brand-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";

export function ProductPage({ product }: { product: Product }) {
  const { addItem } = useCart();
  const gallery = product.images.length > 0 ? product.images : [""];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  React.useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const activeImage = gallery[activeIndex] ?? gallery[0];

  const outcomes = isGlowhaus
    ? [
        "Targeted for visible improvement in tone, texture, and radiance.",
        "Layer-compatible with AI-built AM/PM routines.",
        "Adapted recommendations via SkinIQ and GlowDiary feedback loops."
      ]
    : [
        "Stacked for measurable progress over 3, 6, and 9 month checkpoints.",
        "Root-cause mapped to stress, hormones, nutrition, and lifestyle signals.",
        "Optimized through VitalCoach and VitalTrack adherence insights."
      ];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-[30px] border border-black/10 bg-[#f2f2f2]">
          {activeImage ? (
            <Image src={activeImage} alt={product.name} fill className="object-cover" priority />
          ) : null}
        </div>

        <ScrollArea className="w-full">
          <div className="flex w-max gap-2 pb-3">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-lg border transition ${
                  index === activeIndex ? "border-black" : "border-black/10"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                {image ? (
                  <Image src={image} alt={`${product.name}-${index + 1}`} fill className="object-cover" />
                ) : null}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full bg-black text-white">{product.category}</Badge>
          {(product.badges ?? []).map((badge) => (
            <Badge key={badge} className="rounded-full border border-black/10 bg-white text-slate-700">
              {badge}
            </Badge>
          ))}
          {product.ecoScore ? (
            <Badge className="rounded-full bg-[var(--brand-accent-soft)] text-slate-700">Eco {product.ecoScore}</Badge>
          ) : null}
        </div>

        <div>
          <h1 className="text-4xl font-semibold leading-tight text-black">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>
        </div>

        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-black">{formatCurrency(product.price, product.currency)}</p>
          {product.compareAtPrice ? (
            <p className="text-sm text-slate-500 line-through">
              {formatCurrency(product.compareAtPrice, product.currency)}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="accent" onClick={() => void addItem(product)} className="rounded-full px-6">
            Add to cart
          </Button>
          <Button variant="outline" asChild className="rounded-full px-6">
            <Link href="/checkout">Buy now</Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="border-black/10 p-3 text-sm text-slate-700">
            <ShieldCheck className="mb-1 h-4 w-4 text-[var(--brand-accent)]" />
            Verified quality
          </Card>
          <Card className="border-black/10 p-3 text-sm text-slate-700">
            <Truck className="mb-1 h-4 w-4 text-[var(--brand-accent)]" />
            Ships in 24h
          </Card>
          <Card className="border-black/10 p-3 text-sm text-slate-700">
            <Sparkles className="mb-1 h-4 w-4 text-[var(--brand-accent)]" />
            AI matched
          </Card>
        </div>

        <Card className="space-y-3 border-black/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {isGlowhaus ? "Expected Skin Outcomes" : "Expected Wellness Outcomes"}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {outcomes.map((item) => (
              <li key={item} className="rounded-lg border border-black/10 bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-black/10 p-5">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="usage">How to use</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 text-sm text-slate-600">
              {product.shortDescription ?? product.description}
            </TabsContent>
            <TabsContent value="usage" className="mt-4 text-sm text-slate-600">
              {String(product.howToUse ?? "Apply as directed.")}
            </TabsContent>
            <TabsContent value="ingredients" className="mt-4 text-sm text-slate-600">
              {String(product.ingredients ?? "Ingredients unavailable.")}
            </TabsContent>
          </Tabs>
        </Card>

        <Accordion type="single" collapsible>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping and returns</AccordionTrigger>
            <AccordionContent>
              Orders process same day and include a 30-day satisfaction return window.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="compatibility">
            <AccordionTrigger>Personalization compatibility</AccordionTrigger>
            <AccordionContent>
              Works with your AI profile signals to adapt recommendations over time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
