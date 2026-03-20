import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/site/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// SONAR source snapshots:
// - /Users/justinleanca/SONAR/output/paulaschoice-clone-static-render/index.html
// - /Users/justinleanca/SONAR/output/nutrafol-clone-static-render/index.html

const glowPromos = [
  "NEW CellularYouth Longevity Serum",
  "30% Off When You Build A Routine",
  "Free Shipping on $35+"
] as const;

const glowConcerns = [
  {
    title: "Skin Perfecting",
    line: "Clear, glowing skin powered by exfoliation and barrier support.",
    href: "/collection?category=skincare"
  },
  {
    title: "Plump + Firm",
    line: "Boosted bounce with peptides and hydration-first layering.",
    href: "/collection?category=skincare"
  },
  {
    title: "Youth Extending",
    line: "Age-disrupting formulas to smooth texture and fine lines.",
    href: "/collection?category=skincare"
  },
  {
    title: "Brighten Up",
    line: "Vitamin C-led routines built for uneven tone and dullness.",
    href: "/collection?category=skincare"
  },
  {
    title: "Clear",
    line: "Acne-targeted solutions calibrated for speed and comfort.",
    href: "/collection?category=skincare"
  },
  {
    title: "Barrier Balancing",
    line: "Resilience-focused formulas to calm reactivity and irritation.",
    href: "/collection?category=skincare"
  }
] as const;

const glowPaigePrompts = [
  "PAIGE, how do I get rid of fine lines?",
  "PAIGE, how can I treat acne fast?",
  "PAIGE, schedule a private 1:1 consultation"
] as const;

const vitalPromos = [
  "Fullest Hair Kit for visible results in as little as 3 months",
  "Take the VitalMatch Quiz",
  "Shop by Root Cause"
] as const;

const vitalRootCauses = ["Stress", "Nutrition", "Aging", "Hormones", "Lifestyle", "Metabolism", "Scalp Care"] as const;

const vitalStories = [
  {
    person: "Lydia",
    stage: "Before 3 months",
    quote: "I was experiencing a lot of breakage and I'm not seeing that anymore when I comb my hair.",
    outcomes: "Stronger Hair Growth • Visibly Less Shedding • Visibly Shinier"
  },
  {
    person: "Lilyana",
    stage: "Before 6 months",
    quote: "My hair looks thicker and my hair length is much longer than before.",
    outcomes: "Fuller Hairline • Baby Hairs Growing Out • Less Shedding"
  },
  {
    person: "Richard",
    stage: "Before 9 months",
    quote: "There has been a substantial amount of improvement and fullness in the front area.",
    outcomes: "Visibly Thicker • Fuller Coverage • Improved Density"
  },
  {
    person: "Candace",
    stage: "Before 6 months",
    quote: "The texture changed first, then I started seeing better density month over month.",
    outcomes: "Improved Texture • Better Volume • Reduced Hair Fall"
  }
] as const;

const vitalTimeline = [
  {
    label: "Month 1-3",
    text: "Reduce shedding and improve follicle support from within."
  },
  {
    label: "Month 4-6",
    text: "Notice fuller volume and broader visible coverage improvements."
  },
  {
    label: "Month 7+",
    text: "Sustain thicker growth patterns with optimized consistency."
  }
] as const;

export function HomePage({ categories, featured }: { categories: Category[]; featured: Product[] }) {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  if (isGlowhaus) {
    return <GlowhausCloneHome categories={categories} featured={featured} />;
  }

  return <VitaledgeCloneHome categories={categories} featured={featured} />;
}

function GlowhausCloneHome({ categories, featured }: { categories: Category[]; featured: Product[] }) {
  return (
    <div className="space-y-12 pb-10">
      <PromoStrip items={glowPromos} />

      <section className="grid gap-6 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div>
          <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-700">
            SONAR clone: Paula's Choice guidance flow
          </Badge>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.96] text-black sm:text-6xl">
            Discover your best skin ever
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Achieving your best skin just got easier. Shop concern-led collections, then let AI guidance build the
            routine around your goals.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="accent" asChild className="rounded-full px-6">
              <Link href="/routine-builder">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/skin-analysis">Virtual Skin Analyzer</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="rounded-full border border-black/10 bg-white text-[11px] text-slate-700">AI Skincare Assistant</Badge>
            <Badge className="rounded-full border border-black/10 bg-white text-[11px] text-slate-700">Skin Type Quiz</Badge>
            <Badge className="rounded-full border border-black/10 bg-white text-[11px] text-slate-700">Schedule a Consultation</Badge>
          </div>
        </div>

        <Card className="space-y-3 border-black/10 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">PAIGE, your AI guidance expert</p>
          {glowPaigePrompts.map((prompt, index) => (
            <Link
              key={prompt}
              href="/chatbot"
              className={`block rounded-xl border px-4 py-3 text-sm font-semibold text-slate-800 ${
                index === 0 ? "border-black/20 bg-[var(--brand-accent-soft)]" : "border-black/10 bg-white"
              }`}
            >
              {prompt}
            </Link>
          ))}
          <div className="rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            Guidance quality improves as you track reactions in GlowDiary and routine adherence.
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-black">Shop by Concern</h2>
          <Link href="/collection" className="text-sm font-semibold text-slate-600 hover:text-black">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {glowConcerns.map((item) => (
            <Card key={item.title} className="group border-black/10 p-5 transition hover:border-black/30 hover:bg-white">
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.line}</p>
              <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-black">
                Explore
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold text-black">Meet Our Newest Innovations</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-[30px] border border-black/10 bg-white p-6 md:grid-cols-3">
        <ProofPill title="98%" text="reported healthier-looking skin after 8 weeks" />
        <ProofPill title="4.8/5" text="average product satisfaction across top routines" />
        <ProofPill title="24/7" text="AI guidance for regimen updates and ingredient checks" />
      </section>

      <SharedAiRail />

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-black">Shop by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <Card key={category.id} className="border-black/10 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{category.slug}</p>
              <h3 className="mt-2 text-xl font-semibold text-black">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              <Link href={`/collection?category=${category.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-black">
                Browse
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function VitaledgeCloneHome({ categories, featured }: { categories: Category[]; featured: Product[] }) {
  return (
    <div className="space-y-12 pb-10">
      <PromoStrip items={vitalPromos} />

      <section className="grid gap-6 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
        <div>
          <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-slate-700">
            SONAR clone: Nutrafol results flow
          </Badge>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.96] text-black sm:text-6xl">
            Real people. Real results in 3-6 months.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Start with root causes, then build a personalized stack and track progress against clinically framed
            milestones.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="accent" asChild className="rounded-full px-6">
              <Link href="/quiz">
                Take the Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/stack-builder">Build Stack</Link>
            </Button>
          </div>
        </div>

        <Card className="space-y-4 border-black/10 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Shop by Root Cause</p>
          <div className="flex flex-wrap gap-2">
            {vitalRootCauses.map((cause) => (
              <span
                key={cause}
                className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {cause}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-600">Use VitalTrack to adjust your plan as your monthly check-ins evolve.</p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-black">Before / After Stories</h2>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">results may vary</p>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white px-10 py-6">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {vitalStories.map((story) => (
                <CarouselItem key={story.person} className="md:basis-1/2 xl:basis-1/3">
                  <Card className="h-full border-black/10 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{story.stage}</p>
                    <p className="mt-2 text-sm text-slate-700">"{story.quote}"</p>
                    <p className="mt-3 text-base font-semibold text-black">{story.person}</p>
                    <p className="mt-2 text-xs text-slate-600">{story.outcomes}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 border-black/20" />
            <CarouselNext className="right-1 border-black/20" />
          </Carousel>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-black">Clinical Timeline</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {vitalTimeline.map((item) => (
            <Card key={item.label} className="border-black/10 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-sm text-slate-700">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <Tabs defaultValue="featured">
          <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
            <TabsTrigger value="featured" className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] data-[state=active]:bg-black data-[state=active]:text-white">
              Featured
            </TabsTrigger>
            <TabsTrigger value="category" className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] data-[state=active]:bg-black data-[state=active]:text-white">
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-4">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featured.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="category" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <Card key={category.id} className="border-black/10 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{category.slug}</p>
                  <h3 className="mt-2 text-xl font-semibold text-black">{category.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <SharedAiRail />
    </div>
  );
}

function SharedAiRail() {
  const allAiTools: Array<{ slug: string; label: string }> = [
    ...brandConfig.brandAiTools,
    ...brandConfig.sharedAiTools
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold text-black">AI Commerce Layer</h2>
        <Badge className="rounded-full border border-black/10 bg-white text-[11px] uppercase tracking-[0.14em] text-slate-600">
          21st carousel
        </Badge>
      </div>

      <div className="rounded-[28px] border border-black/10 bg-white px-10 py-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {allAiTools.map((tool) => (
              <CarouselItem key={tool.slug} className="sm:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-black/10 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">AI Tool</p>
                  <h3 className="mt-2 text-xl font-semibold text-black">{tool.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">Conversion-assist workflow tuned for product discovery and retention.</p>
                  <Button variant="outline" asChild className="mt-4 rounded-full">
                    <Link href={`/${tool.slug}`}>
                      Open tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 border-black/20" />
          <CarouselNext className="right-1 border-black/20" />
        </Carousel>
      </div>
    </section>
  );
}

function PromoStrip({ items }: { items: readonly string[] }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-center gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProofPill({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
      <p className="text-2xl font-bold text-black">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{text}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
        verified signal
      </div>
    </div>
  );
}
