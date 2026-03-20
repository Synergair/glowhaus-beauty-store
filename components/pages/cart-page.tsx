"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/pages/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function CartPage() {
  const { state, subtotal, updateItem, removeItem } = useCart();

  return (
    <div className="space-y-8">
      <PageHeader title="Cart" description="Review your selected items before checkout." eyebrow="Ecommerce" />

      {state.items.length === 0 ? (
        <Card className="space-y-4 text-center">
          <p className="text-sm text-slate-600">Your cart is empty.</p>
          <div>
            <Button variant="accent" asChild>
              <Link href="/collection">Continue shopping</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-3">
            {state.items.map((item) => (
              <Card key={item.id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(item.price, item.currency)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded border border-slate-300 p-1"
                    onClick={() => void updateItem(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    className="rounded border border-slate-300 p-1"
                    onClick={() => void updateItem(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-300 p-1 text-rose-600"
                    onClick={() => void removeItem(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Button variant="accent" className="w-full" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
