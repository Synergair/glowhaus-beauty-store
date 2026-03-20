"use client";

import * as React from "react";

const WISHLIST_KEY = "glowhaus-wishlist";

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  contains: (productId: string) => boolean;
}

const WishlistContext = React.createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      setIds(JSON.parse(stored) as string[]);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = React.useCallback((productId: string) => {
    setIds((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  }, []);

  const contains = React.useCallback((productId: string) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, contains }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
