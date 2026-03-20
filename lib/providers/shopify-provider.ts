import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
  COLLECTIONS_QUERY,
  PRODUCTS_QUERY
} from "@/lib/shopify/queries";
import { mapShopifyCart, mapShopifyCollections, mapShopifyProducts } from "@/lib/shopify/mappers";
import { storefrontFetch } from "@/lib/shopify/client";
import type { CartState, Catalog } from "@/lib/types";

interface CartMutationResult {
  cartLinesAdd?: { cart: unknown; userErrors: Array<{ message: string }> };
  cartLinesUpdate?: { cart: unknown; userErrors: Array<{ message: string }> };
  cartLinesRemove?: { cart: unknown; userErrors: Array<{ message: string }> };
  cartCreate?: { cart: unknown };
}

function assertNoUserErrors(errors: Array<{ message: string }>) {
  if (!errors.length) {
    return;
  }

  throw new Error(errors.map((error) => error.message).join(", "));
}

export async function getShopifyCatalog(): Promise<Catalog> {
  const [productsResponse, collectionsResponse] = await Promise.all([
    storefrontFetch(PRODUCTS_QUERY, { first: 48 }),
    storefrontFetch(COLLECTIONS_QUERY, { first: 24 })
  ]);

  const products = mapShopifyProducts(productsResponse as never);
  const categories = mapShopifyCollections(collectionsResponse as never);

  return {
    store: "Shopify",
    currency: products[0]?.currency ?? "USD",
    categories,
    products
  };
}

export async function createShopifyCart(): Promise<CartState> {
  const response = (await storefrontFetch(CART_CREATE_MUTATION)) as CartMutationResult;
  return mapShopifyCart({ cart: response.cartCreate?.cart as never });
}

export async function getShopifyCart(cartId: string): Promise<CartState> {
  const response = (await storefrontFetch(CART_QUERY, { id: cartId })) as never;
  return mapShopifyCart(response);
}

export async function addShopifyCartLine(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<CartState> {
  const response = (await storefrontFetch(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId, quantity }]
  })) as CartMutationResult;

  const data = response.cartLinesAdd;
  if (!data) {
    throw new Error("Failed to add cart line");
  }

  assertNoUserErrors(data.userErrors);
  return mapShopifyCart({ cart: data.cart as never });
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<CartState> {
  const response = (await storefrontFetch(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }]
  })) as CartMutationResult;

  const data = response.cartLinesUpdate;
  if (!data) {
    throw new Error("Failed to update cart line");
  }

  assertNoUserErrors(data.userErrors);
  return mapShopifyCart({ cart: data.cart as never });
}

export async function removeShopifyCartLine(cartId: string, lineId: string): Promise<CartState> {
  const response = (await storefrontFetch(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId]
  })) as CartMutationResult;

  const data = response.cartLinesRemove;
  if (!data) {
    throw new Error("Failed to remove cart line");
  }

  assertNoUserErrors(data.userErrors);
  return mapShopifyCart({ cart: data.cart as never });
}
