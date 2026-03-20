import { NextResponse } from "next/server";
import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLine,
  updateShopifyCartLine
} from "@/lib/providers/shopify-provider";
import { isShopifyConfigured } from "@/lib/shopify/client";

export async function GET(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ cartId: null, checkoutUrl: null, items: [] });
  }

  const url = new URL(request.url);
  const cartId = url.searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.json({ cartId: null, checkoutUrl: null, items: [] });
  }

  try {
    const cart = await getShopifyCart(cartId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json({ cartId: null, checkoutUrl: null, items: [] });
  }

  const payload = (await request.json()) as {
    action: "add" | "update" | "remove";
    cartId?: string | null;
    merchandiseId?: string;
    lineId?: string;
    quantity?: number;
  };

  try {
    let cartId = payload.cartId ?? null;
    if (!cartId) {
      const created = await createShopifyCart();
      cartId = created.cartId;
      if (!cartId) {
        return NextResponse.json(created);
      }
    }

    if (payload.action === "add") {
      if (!payload.merchandiseId) {
        return NextResponse.json({ message: "merchandiseId is required" }, { status: 400 });
      }
      const cart = await addShopifyCartLine(cartId, payload.merchandiseId, payload.quantity ?? 1);
      return NextResponse.json(cart);
    }

    if (payload.action === "update") {
      if (!payload.lineId) {
        return NextResponse.json({ message: "lineId is required" }, { status: 400 });
      }
      const cart = await updateShopifyCartLine(cartId, payload.lineId, payload.quantity ?? 1);
      return NextResponse.json(cart);
    }

    if (payload.action === "remove") {
      if (!payload.lineId) {
        return NextResponse.json({ message: "lineId is required" }, { status: 400 });
      }
      const cart = await removeShopifyCartLine(cartId, payload.lineId);
      return NextResponse.json(cart);
    }

    return NextResponse.json({ message: "Unsupported cart action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Cart operation failed" },
      { status: 500 }
    );
  }
}
