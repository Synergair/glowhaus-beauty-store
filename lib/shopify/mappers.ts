import type { CartState, Product } from "@/lib/types";

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        featuredImage?: { url: string | null } | null;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
        variants: {
          edges: Array<{
            node: {
              id: string;
            };
          }>;
        };
        tags: string[];
      };
    }>;
  };
}

interface ShopifyCollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        image?: { url?: string | null } | null;
      };
    }>;
  };
}

interface ShopifyCartResponse {
  cart: {
    id: string;
    checkoutUrl: string;
    lines: {
      edges: Array<{
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            product: {
              id: string;
              title: string;
              handle: string;
              featuredImage?: { url?: string | null } | null;
            };
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        };
      }>;
    };
  } | null;
}

export function mapShopifyProducts(response: ShopifyProductsResponse): Product[] {
  return response.products.edges.map(({ node }) => ({
    id: node.id,
    slug: node.handle,
    name: node.title,
    description: node.description,
    shortDescription: node.description,
    category: node.tags[0] ?? "general",
    price: Number(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    images: node.featuredImage?.url ? [node.featuredImage.url] : [],
    tags: node.tags,
    badges: [],
    merchandiseId: node.variants.edges[0]?.node.id
  }));
}

export function mapShopifyCollections(response: ShopifyCollectionsResponse) {
  return response.collections.edges.map(({ node }) => ({
    id: node.id,
    name: node.title,
    slug: node.handle,
    description: node.description,
    image: node.image?.url ?? undefined
  }));
}

export function mapShopifyCart(response: ShopifyCartResponse): CartState {
  if (!response.cart) {
    return {
      cartId: null,
      checkoutUrl: null,
      items: []
    };
  }

  return {
    cartId: response.cart.id,
    checkoutUrl: response.cart.checkoutUrl,
    items: response.cart.lines.edges.map(({ node }) => ({
      id: node.id,
      productId: node.merchandise.product.id,
      slug: node.merchandise.product.handle,
      name: node.merchandise.product.title,
      image: node.merchandise.product.featuredImage?.url ?? "",
      price: Number(node.merchandise.price.amount),
      currency: node.merchandise.price.currencyCode,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id
    }))
  };
}
