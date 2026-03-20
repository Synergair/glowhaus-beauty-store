import Link from "next/link";
import { brandConfig } from "@/lib/brand-config";
import { Badge } from "@/components/ui/badge";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  const allAiTools: Array<{ slug: string; label: string }> = [
    ...brandConfig.brandAiTools,
    ...brandConfig.sharedAiTools
  ];
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <footer className="mt-20 border-t border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto grid w-full max-w-[1380px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_1fr] lg:px-8">
        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-[0.16em] text-black">{brandConfig.name}</h2>
          <p className="max-w-md text-sm text-slate-600">
            {isGlowhaus
              ? "Modeled from SONAR-cloned beauty conversion flows: guidance-first merchandising and concern-based navigation."
              : "Modeled from SONAR-cloned wellness conversion flows: root-cause segmentation and clinical proof framing."}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] text-[10px] uppercase tracking-[0.14em] text-slate-700">
              SONAR Clone Patterns
            </Badge>
            <Badge className="rounded-full border border-black/10 bg-white text-[10px] uppercase tracking-[0.14em] text-slate-700">
              21st Components
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-black">
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            {isGlowhaus ? "AI Guidance Stack" : "AI + Tracking Stack"}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {allAiTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-black hover:text-black"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        {new Date().getFullYear()} {brandConfig.name}. Headless Shopify storefront.
      </div>
    </footer>
  );
}
