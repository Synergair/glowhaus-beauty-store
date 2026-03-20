import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/pages/page-header";
import { Card } from "@/components/ui/card";
import { brandConfig } from "@/lib/brand-config";

const pageBodies: Record<string, string[]> = {
  about: [
    "Built as a headless storefront with conversion architecture inspired by high-performing category leaders.",
    "The experience blends ecommerce merchandising with an AI layer for guidance, personalization, and retention."
  ],
  contact: [
    "Support responds within one business day for order, product, and subscription requests.",
    "For account and shipping updates, include your order number for fastest handling."
  ],
  shipping: [
    "Orders are processed in 1-2 business days and ship with trackable milestones.",
    "Expedited options are calculated at checkout based on destination and inventory node."
  ],
  returns: [
    "Unopened items are eligible for return within 30 days of delivery.",
    "Subscription shipments can be paused or skipped before the renewal cut-off date."
  ],
  privacy: [
    "Personalization data is used to improve product recommendations and AI guidance quality.",
    "You can request deletion or export of profile data from the account dashboard."
  ],
  terms: [
    "Purchases are subject to product availability, fulfillment timing, and checkout verification.",
    "Promotional offers cannot be retroactively applied after order confirmation."
  ]
};

export function InfoPage({ title, description, slug }: { title: string; description: string; slug: string }) {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";
  const body = pageBodies[slug] ?? [
    "This content route is production-ready and can be CMS-managed without code changes.",
    "Use this shell for policy, education, and conversion-supporting editorial pages."
  ];

  return (
    <div className="space-y-8">
      <PageHeader title={title} description={description} eyebrow="Information" />

      <Card className="space-y-4 border-black/10 p-6">
        {body.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600">
            {paragraph}
          </p>
        ))}
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
          {isGlowhaus ? "Beauty policy shell" : "Wellness policy shell"} • route: /{slug}
        </p>
      </Card>

      {slug === "faq" ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>How quickly do orders ship?</AccordionTrigger>
            <AccordionContent>
              Orders are processed in 1-2 business days, then shipped based on the selected service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I edit subscriptions after purchase?</AccordionTrigger>
            <AccordionContent>
              You can adjust cadence, swap products, or pause in the subscription dashboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Are AI recommendations mandatory?</AccordionTrigger>
            <AccordionContent>
              No. You can shop manually, but profile-based guidance improves product fit over time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </div>
  );
}
