"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/pages/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const shippingOptions = [
  { value: "standard", label: "Standard", detail: "3-5 business days" },
  { value: "priority", label: "Priority", detail: "2 business days" },
  { value: "express", label: "Express", detail: "Next business day" }
] as const;

export function CheckoutPage() {
  const { state, subtotal } = useCart();
  const [shipping, setShipping] = useState<(typeof shippingOptions)[number]["value"]>("standard");

  const checkoutUrl = useMemo(() => {
    return state.checkoutUrl ?? "/confirmation";
  }, [state.checkoutUrl]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Checkout"
        description="Complete contact details and continue to secure Shopify-hosted payment."
        eyebrow="Ecommerce"
      />

      <div className="rounded-2xl border border-black/10 bg-[var(--brand-accent-soft)] px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-500">
          <span>form_flow</span>
          <span>Step 2 of 3</span>
        </div>
        <Progress value={66} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-5 border-black/10 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Emma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Taylor" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Street address" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Delivery speed</Label>
            <RadioGroup
              value={shipping}
              onValueChange={(value) => setShipping(value as (typeof shippingOptions)[number]["value"])}
              className="grid gap-2"
            >
              {shippingOptions.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`shipping-${option.value}`}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-3 py-2.5"
                >
                  <RadioGroupItem id={`shipping-${option.value}`} value={option.value} />
                  <span className="text-sm text-slate-700">
                    <span className="font-semibold text-black">{option.label}</span>
                    <span className="ml-2 text-slate-500">{option.detail}</span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </Card>

        <Card className="space-y-4 border-black/10 p-5">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <p className="text-sm text-slate-600">{state.items.length} items</p>
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Shipping</span>
            <span className="font-semibold">{shipping === "express" ? "$19" : shipping === "priority" ? "$9" : "$0"}</span>
          </div>
          <Button variant="accent" className="w-full rounded-full" asChild>
            <Link href={checkoutUrl}>Continue to payment</Link>
          </Button>
          <p className="text-xs text-slate-500">
            Payments are processed in Shopify checkout for PCI-compliant completion.
          </p>
        </Card>
      </div>
    </div>
  );
}
