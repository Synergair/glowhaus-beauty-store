"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { runMockAI } from "@/lib/ai-mocks";
import type { AIToolResponse } from "@/lib/types";
import { brandConfig } from "@/lib/brand-config";
import { PageHeader } from "@/components/pages/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function ConfirmationPage() {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <div className="mx-auto max-w-2xl space-y-8 text-center">
      <PageHeader
        title="Order Confirmed"
        description="Your order has been received and is now being prepared."
        eyebrow="Success"
      />
      <Card className="space-y-4 border-black/10 p-6">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <p className="text-sm text-slate-600">Confirmation number: {isGlowhaus ? "GH-10589" : "VE-10589"}</p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/track-order">Track order</Link>
          </Button>
          <Button variant="accent" asChild>
            <Link href="/collection">Continue shopping</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function SubscribePage() {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        title="Newsletter + Membership"
        description="Receive product drops, educational content, and member-exclusive offers."
        eyebrow="Growth"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2 border-black/10 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Starter</p>
          <p className="text-2xl font-black">$0</p>
          <p className="text-sm text-slate-600">Weekly drop alerts and curated education.
          </p>
        </Card>
        <Card className="space-y-2 border-black/20 bg-white p-4 shadow-[0_14px_28px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Insider</p>
          <p className="text-2xl font-black">$9/mo</p>
          <p className="text-sm text-slate-600">
            {isGlowhaus
              ? "Priority launch access + monthly routine credits."
              : "Priority access + monthly stack optimization credits."}
          </p>
        </Card>
        <Card className="space-y-2 border-black/10 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Pro</p>
          <p className="text-2xl font-black">$19/mo</p>
          <p className="text-sm text-slate-600">Concierge routing, advanced personalization, premium support.</p>
        </Card>
      </div>

      <Card className="space-y-4 border-black/10 p-5">
        <div className="space-y-2">
          <Label htmlFor="subscriber-email">Email</Label>
          <Input id="subscriber-email" placeholder="you@example.com" />
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <Checkbox defaultChecked />
          I agree to promotional communications
        </label>
        <Button variant="accent">Subscribe</Button>
      </Card>
    </div>
  );
}

export function SubscriptionDashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscription Dashboard"
        description="Review plan status, next shipment, and swap options."
        eyebrow="Subscriptions"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-2 border-black/10 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Current Plan</p>
          <h2 className="text-xl font-bold">Essentials Monthly</h2>
          <p className="text-sm text-slate-600">Next charge on 2026-04-02</p>
          <Progress value={72} />
        </Card>
        <Card className="space-y-3 border-black/10 p-5">
          <h3 className="text-lg font-semibold">Actions</h3>
          <Button variant="outline">Skip next delivery</Button>
          <Button variant="outline">Swap products</Button>
          <Button variant="ghost">Cancel subscription</Button>
        </Card>
      </div>
    </div>
  );
}

export function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="Track Order"
        description="Track shipment progress in real-time across fulfillment milestones."
        eyebrow="Post Purchase"
      />
      <Card className="space-y-4 border-black/10 p-5">
        <div className="space-y-2">
          <Label htmlFor="order-id">Order number</Label>
          <Input id="order-id" placeholder="GH-10589" />
        </div>
        <Button variant="accent">Track</Button>
        <Progress value={85} />
        <p className="text-sm text-slate-600">In transit. Expected delivery: March 23, 2026.</p>
      </Card>
    </div>
  );
}

export function RewardsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Rewards"
        description="Earn points through purchases, referrals, and social engagement."
        eyebrow="Loyalty"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-3 border-black/10 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Current balance</p>
          <h2 className="text-3xl font-black text-slate-900">1,240 points</h2>
          <Progress value={62} />
          <p className="text-sm text-slate-600">260 points to Platinum tier.</p>
        </Card>
        <Card className="space-y-3 border-black/10 p-5">
          <h3 className="text-lg font-semibold">Redeem options</h3>
          <p className="text-sm text-slate-600">500 points = $5 off</p>
          <p className="text-sm text-slate-600">1000 points = Deluxe sample set</p>
          <Button variant="accent">Redeem now</Button>
        </Card>
      </div>
    </div>
  );
}

export function AIFeaturePage({ slug, title }: { slug: string; title: string }) {
  const allAiTools: Array<{ slug: string; label: string }> = [
    ...brandConfig.brandAiTools,
    ...brandConfig.sharedAiTools
  ];
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<AIToolResponse | null>(null);
  const [brief, setBrief] = React.useState("");
  const [consent, setConsent] = React.useState(true);

  async function submit() {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, consent })
      });

      if (response.ok) {
        const payload = (await response.json()) as AIToolResponse;
        setResult(payload);
      } else {
        setResult(runMockAI(slug, { brief, consent }));
      }
    } catch {
      setResult(runMockAI(slug, { brief, consent }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={title}
        description={`This ${title} flow ships with production-grade UX and mocked AI boundaries.`}
        eyebrow="AI Feature"
      />

      <Tabs defaultValue="assistant">
        <TabsList>
          <TabsTrigger value="assistant">Assistant</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="assistant">
          <Card className="space-y-4 border-black/10 p-5">
            <div className="space-y-2">
              <Label htmlFor="brief">Context</Label>
              <Textarea
                id="brief"
                placeholder="Describe your goal, preferences, or constraints"
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} />
              I consent to process this input for personalized recommendations.
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent" onClick={() => void submit()} disabled={loading}>
                {loading ? "Analyzing..." : "Run"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">How it works</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Model Boundary</DialogTitle>
                  <DialogDescription>
                    This feature currently runs mocked AI responses with stable contract shape. Swap `/api/ai/*`
                    handlers for live model integration when ready.
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {result ? (
            <Card className="space-y-4 border-black/10 p-5">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles className="h-4 w-4 text-[var(--brand-accent)]" />
                <p className="font-semibold">{result.title}</p>
              </div>
              <p className="text-sm text-slate-600">{result.summary}</p>
              <Progress value={result.score} />
              <ul className="space-y-2 text-sm text-slate-700">
                {result.recommendations.map((item) => (
                  <li key={item} className="rounded-md border border-black/10 bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </TabsContent>
        <TabsContent value="history">
          <Card className="border-black/10 p-5">
            <p className="text-sm text-slate-600">
              Previous interactions will appear here once persistence is enabled.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-black/10 p-5">
        <p className="text-xs uppercase tracking-wider text-slate-500">Other AI tools</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {allAiTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
