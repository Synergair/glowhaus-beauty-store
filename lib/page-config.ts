import { brandConfig } from "@/lib/brand-config";
import { type PageConfig } from "@/lib/types";

const corePages: PageConfig[] = [
  {
    slug: "collection",
    kind: "collection",
    title: "Collection",
    description: "Browse all products with category filters and sorting controls."
  },
  {
    slug: "product",
    kind: "product",
    title: "Featured Product",
    description: "Product spotlight and quick purchase entry point."
  },
  {
    slug: "cart",
    kind: "cart",
    title: "Cart",
    description: "Review line items, quantities, and totals before checkout."
  },
  {
    slug: "checkout",
    kind: "checkout",
    title: "Checkout",
    description: "Confirm address, contact details, and continue to Shopify checkout."
  },
  {
    slug: "confirmation",
    kind: "confirmation",
    title: "Order Confirmation",
    description: "Purchase confirmation and post-order next steps."
  },
  {
    slug: "search",
    kind: "search",
    title: "Search",
    description: "Search catalog and discover recommended products."
  },
  {
    slug: "wishlist",
    kind: "wishlist",
    title: "Wishlist",
    description: "Saved products with quick add-to-cart controls."
  },
  {
    slug: "account",
    kind: "account",
    title: "Account",
    description: "Manage profile, addresses, and order history."
  },
  {
    slug: "login",
    kind: "auth",
    title: "Login",
    description: "Sign into your customer account."
  },
  {
    slug: "register",
    kind: "auth",
    title: "Register",
    description: "Create an account for faster checkout and rewards access."
  },
  {
    slug: "forgot-password",
    kind: "auth",
    title: "Forgot Password",
    description: "Reset account credentials securely."
  },
  {
    slug: "subscribe",
    kind: "subscribe",
    title: "Subscribe",
    description: "Join the newsletter and product drop list."
  },
  {
    slug: "subscription-dashboard",
    kind: "subscription-dashboard",
    title: "Subscription Dashboard",
    description: "Manage delivery cadence and upcoming subscription orders."
  },
  {
    slug: "track-order",
    kind: "track-order",
    title: "Track Order",
    description: "Track shipment progress with timeline status updates."
  },
  {
    slug: "rewards",
    kind: "rewards",
    title: "Rewards",
    description: "Track points, tiers, and unlock loyalty perks."
  }
];

const infoPages: PageConfig[] = [
  {
    slug: "about",
    kind: "info",
    title: "About",
    description: "Brand story, mission, and product philosophy."
  },
  {
    slug: "contact",
    kind: "info",
    title: "Contact",
    description: "Support channels and customer care response times."
  },
  {
    slug: "faq",
    kind: "info",
    title: "FAQ",
    description: "Answers for shipping, returns, account, and subscription topics."
  },
  {
    slug: "shipping",
    kind: "info",
    title: "Shipping",
    description: "Delivery regions, processing windows, and carrier details."
  },
  {
    slug: "returns",
    kind: "info",
    title: "Returns",
    description: "Return policy and exchange process."
  },
  {
    slug: "privacy",
    kind: "info",
    title: "Privacy",
    description: "Privacy notice and data handling terms."
  },
  {
    slug: "terms",
    kind: "info",
    title: "Terms",
    description: "Store terms and purchase conditions."
  }
];

const aiPages: PageConfig[] = [
  ...brandConfig.brandAiTools.map((tool) => ({
    slug: tool.slug,
    kind: "ai" as const,
    title: tool.label,
    description: `Interactive ${tool.label} workspace with production-ready mocked AI responses.`,
    featureName: tool.label
  })),
  ...brandConfig.sharedAiTools.map((tool) => ({
    slug: tool.slug,
    kind: "ai" as const,
    title: tool.label,
    description: `Interactive ${tool.label} workspace with production-ready mocked AI responses.`,
    featureName: tool.label
  }))
];

export const pageConfigBySlug = new Map<string, PageConfig>(
  [...corePages, ...infoPages, ...aiPages].map((page) => [page.slug, page])
);

export function getPageConfig(slug: string) {
  return pageConfigBySlug.get(slug);
}

export const allPageConfigs = [...corePages, ...infoPages, ...aiPages];
