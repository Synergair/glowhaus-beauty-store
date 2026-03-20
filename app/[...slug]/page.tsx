import { existsSync } from "node:fs";
import { join } from "node:path";
import { redirect } from "next/navigation";

const sonarFallbackByRoot: Record<string, string> = {
  collection: "/sonar-clone/skin-care-products/index.html",
  product: "/sonar-clone/clinical-pro-retinaldehyde-dual-retinoid-treatment/150.html/index.html",
  cart: "/sonar-clone/cart/index.html",
  checkout: "/sonar-clone/cart/index.html",
  confirmation: "/sonar-clone/account/index.html",
  search: "/sonar-clone/skin-care-products/index.html",
  wishlist: "/sonar-clone/shop-collections/skin-perfecting/index.html",
  account: "/sonar-clone/account/index.html",
  login: "/sonar-clone/account/index.html",
  register: "/sonar-clone/account/index.html",
  "forgot-password": "/sonar-clone/account/index.html",
  subscribe: "/sonar-clone/index.html",
  "subscription-dashboard": "/sonar-clone/account/index.html",
  "track-order": "/sonar-clone/account/index.html",
  rewards: "/sonar-clone/account/index.html",
  about: "/sonar-clone/index.html",
  contact: "/sonar-clone/index.html",
  faq: "/sonar-clone/index.html",
  shipping: "/sonar-clone/index.html",
  returns: "/sonar-clone/index.html",
  privacy: "/sonar-clone/index.html",
  terms: "/sonar-clone/index.html",
  "skin-analysis": "/sonar-clone/skin-type-quiz/index.html",
  "routine-builder": "/sonar-clone/build-a-routine/index.html",
  "virtual-try-on": "/sonar-clone/shop-collections/plump-and-firm/index.html",
  "shade-matcher": "/sonar-clone/shop-collections/skin-perfecting/index.html",
  "ingredient-scanner": "/sonar-clone/skin-care-products/index.html",
  "skin-diary": "/sonar-clone/account/index.html",
  "dupe-finder": "/sonar-clone/shop-collections/youth-extending/index.html",
  chatbot: "/sonar-clone/__sonar_preview/index.html",
  "voice-shop": "/sonar-clone/__sonar_preview/index.html",
  "price-alerts": "/sonar-clone/__sonar_preview/index.html",
  "eco-score": "/sonar-clone/__sonar_preview/index.html",
  trends: "/sonar-clone/__sonar_preview/index.html",
  "social-shopping": "/sonar-clone/__sonar_preview/index.html",
  creators: "/sonar-clone/__sonar_preview/index.html",
  live: "/sonar-clone/__sonar_preview/index.html"
};

function resolveSonarPath(pathname: string): string | null {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");

  if (!trimmed) {
    return "/sonar-clone/index.html";
  }

  const candidates = [
    `/sonar-clone/${trimmed}/index.html`,
    `/sonar-clone/${trimmed}.html`,
    `/sonar-clone/${trimmed}`
  ];

  for (const candidate of candidates) {
    const local = join(process.cwd(), "public", candidate.slice(1));
    if (existsSync(local)) {
      return candidate;
    }
  }

  return null;
}

interface CatchAllRouteProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CatchAllRoute({ params }: CatchAllRouteProps) {
  const { slug } = await params;
  const path = `/${(slug ?? []).join("/")}`;

  const directMatch = resolveSonarPath(path);
  if (directMatch) {
    redirect(directMatch);
  }

  const root = slug?.[0] ?? "";
  const mapped = sonarFallbackByRoot[root];
  if (mapped) {
    redirect(mapped);
  }

  redirect(`/sonar-clone/__sonar_uncloned/index.html?target=${encodeURIComponent(path)}`);
}
