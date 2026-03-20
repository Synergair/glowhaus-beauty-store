"use client";

import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User
} from "lucide-react";
import { brandConfig } from "@/lib/brand-config";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet } from "@/components/ui/sheet";

const vitalRootCauses = ["Stress", "Nutrition", "Aging", "Hormones", "Lifestyle", "Metabolism", "Scalp Care"];
const glowConcerns = ["Fine Lines", "Acne", "Dark Spots", "Texture", "Pores", "Barrier"];

export function Header() {
  const { itemCount } = useCart();
  const featuredTool = brandConfig.brandAiTools[0];
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
      <div className="border-b border-black/10 bg-[var(--brand-accent-soft)] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 sm:px-6 lg:px-8">
        {isGlowhaus
          ? "New CellularYouth™ Serum • 30% Off Routine Builder • AI Guidance Included"
          : "Visible Results in 3-6 Months • Build by Root Cause • Clinical Tracking"}
      </div>

      <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-black tracking-[0.2em] text-black">
            {brandConfig.name}
          </Link>
          <span className="hidden rounded-full border border-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 lg:inline-flex">
            headless
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {brandConfig.headerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
              >
                {isGlowhaus ? "Shop by Concern" : "Shop by Root Cause"}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>{isGlowhaus ? "Top Skin Concerns" : "Root Causes"}</DropdownMenuLabel>
              {(isGlowhaus ? glowConcerns : vitalRootCauses).map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
              >
                AI Layer
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Brand AI</DropdownMenuLabel>
              {brandConfig.brandAiTools.map((tool) => (
                <DropdownMenuItem key={tool.slug} asChild>
                  <Link href={`/${tool.slug}`}>{tool.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Shared AI</DropdownMenuLabel>
              {brandConfig.sharedAiTools.map((tool) => (
                <DropdownMenuItem key={tool.slug} asChild>
                  <Link href={`/${tool.slug}`}>{tool.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link href="/search" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link href="/account" aria-label="Account">
              <User className="h-4 w-4" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </Button>

          {featuredTool ? (
            <Button variant="accent" asChild className="hidden rounded-full px-4 text-xs sm:inline-flex">
              <Link href={`/${featuredTool.slug}`}>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {isGlowhaus ? "Start Building" : "Take Quiz"}
              </Link>
            </Button>
          ) : null}

          <div className="md:hidden">
            <Sheet
              triggerLabel={
                <span className="inline-flex items-center gap-1">
                  <Menu className="h-4 w-4" />
                  Menu
                </span>
              }
              title="Explore"
            >
              <ScrollArea className="h-full pr-1">
                <nav className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Store</p>
                    {brandConfig.headerLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg border border-black/10 px-3 py-2.5 text-sm font-semibold text-black"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {isGlowhaus ? "Skin Concerns" : "Root Causes"}
                    </p>
                    {(isGlowhaus ? glowConcerns : vitalRootCauses).map((item) => (
                      <p key={item} className="rounded-lg border border-black/10 px-3 py-2.5 text-sm text-slate-700">
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">AI Layer</p>
                    {[...brandConfig.brandAiTools, ...brandConfig.sharedAiTools].map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="block rounded-lg border border-black/10 px-3 py-2.5 text-sm text-slate-700"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </ScrollArea>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
