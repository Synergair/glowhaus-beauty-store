"use client";

import * as React from "react";
import type { CartItem, CartState, Product } from "@/lib/types";

interface CartContextValue {
  state: CartState;
  mode: "local" | "shopify";
  initialized: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clear: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = React.createContext<CartContextValue | null>(null);

const CART_KEY = "glowhaus-cart-state";
const CART_ID_KEY = "glowhaus-shopify-cart-id";

function sumSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<"local" | "shopify">("local");
  const [initialized, setInitialized] = React.useState(false);
  const [state, setState] = React.useState<CartState>({
    cartId: null,
    checkoutUrl: null,
    items: []
  });

  React.useEffect(() => {
    async function initialize() {
      try {
        const response = await fetch("/api/runtime-config");
        const config = (await response.json()) as { shopifyEnabled: boolean };

        if (config.shopifyEnabled) {
          setMode("shopify");
          const existingCartId = window.localStorage.getItem(CART_ID_KEY);
          if (existingCartId) {
            const cartResponse = await fetch(`/api/cart?cartId=${encodeURIComponent(existingCartId)}`);
            if (cartResponse.ok) {
              const payload = (await cartResponse.json()) as CartState;
              setState(payload);
            }
          }
        } else {
          const stored = window.localStorage.getItem(CART_KEY);
          if (stored) {
            setState(JSON.parse(stored) as CartState);
          }
        }
      } catch {
        setMode("local");
      } finally {
        setInitialized(true);
      }
    }

    void initialize();
  }, []);

  React.useEffect(() => {
    if (!initialized || mode !== "local") {
      return;
    }

    window.localStorage.setItem(CART_KEY, JSON.stringify(state));
  }, [initialized, mode, state]);

  const addItem = React.useCallback(
    async (product: Product, quantity = 1) => {
      if (mode === "local") {
        setState((previous) => {
          const existing = previous.items.find((item) => item.productId === product.id);
          if (existing) {
            return {
              ...previous,
              items: previous.items.map((item) =>
                item.productId === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity
                    }
                  : item
              )
            };
          }

          return {
            ...previous,
            items: [
              ...previous.items,
              {
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                name: product.name,
                slug: product.slug,
                image: product.images[0] ?? "",
                price: product.price,
                currency: product.currency,
                quantity,
                merchandiseId: product.merchandiseId
              }
            ]
          };
        });

        return;
      }

      const payload = {
        action: "add",
        cartId: state.cartId,
        merchandiseId: product.merchandiseId ?? product.id,
        quantity
      };

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const nextState = (await response.json()) as CartState;
        setState(nextState);
        if (nextState.cartId) {
          window.localStorage.setItem(CART_ID_KEY, nextState.cartId);
        }
      }
    },
    [mode, state.cartId]
  );

  const updateItem = React.useCallback(
    async (lineId: string, quantity: number) => {
      if (mode === "local") {
        if (quantity <= 0) {
          setState((previous) => ({
            ...previous,
            items: previous.items.filter((item) => item.id !== lineId)
          }));
          return;
        }

        setState((previous) => ({
          ...previous,
          items: previous.items.map((item) =>
            item.id === lineId
              ? {
                  ...item,
                  quantity
                }
              : item
          )
        }));
        return;
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          cartId: state.cartId,
          lineId,
          quantity
        })
      });

      if (response.ok) {
        setState((await response.json()) as CartState);
      }
    },
    [mode, state.cartId]
  );

  const removeItem = React.useCallback(
    async (lineId: string) => {
      if (mode === "local") {
        setState((previous) => ({
          ...previous,
          items: previous.items.filter((item) => item.id !== lineId)
        }));
        return;
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          cartId: state.cartId,
          lineId
        })
      });

      if (response.ok) {
        setState((await response.json()) as CartState);
      }
    },
    [mode, state.cartId]
  );

  const clear = React.useCallback(() => {
    setState((previous) => ({
      ...previous,
      items: []
    }));
  }, []);

  const itemCount = React.useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items]
  );

  const subtotal = React.useMemo(() => sumSubtotal(state.items), [state.items]);

  const value = React.useMemo<CartContextValue>(
    () => ({
      state,
      mode,
      initialized,
      addItem,
      updateItem,
      removeItem,
      clear,
      itemCount,
      subtotal
    }),
    [state, mode, initialized, addItem, updateItem, removeItem, clear, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
