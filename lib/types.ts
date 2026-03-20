export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  price: number;
  compareAtPrice?: number | null;
  currency: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  stock?: number;
  badges?: string[];
  tags?: string[];
  ecoScore?: string;
  isFeatured?: boolean;
  merchandiseId?: string;
  [key: string]: unknown;
}

export interface Catalog {
  store: string;
  currency: string;
  categories: Category[];
  products: Product[];
}

export type PageKind =
  | "collection"
  | "product"
  | "cart"
  | "checkout"
  | "confirmation"
  | "search"
  | "wishlist"
  | "account"
  | "auth"
  | "subscribe"
  | "subscription-dashboard"
  | "track-order"
  | "rewards"
  | "info"
  | "ai";

export interface PageConfig {
  slug: string;
  kind: PageKind;
  title: string;
  description: string;
  featureName?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
  merchandiseId?: string;
}

export interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
}

export interface AIToolResponse {
  title: string;
  summary: string;
  recommendations: string[];
  score: number;
}
