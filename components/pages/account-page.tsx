import { PageHeader } from "@/components/pages/page-header";
import { brandConfig } from "@/lib/brand-config";
import { Card } from "@/components/ui/card";
import { Table, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AccountPage() {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Dashboard"
        description="Manage profile, saved addresses, subscriptions, and recent order status."
        eyebrow="Account"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-3 border-black/10 p-5 lg:col-span-1">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-slate-600">Email: member@example.com</p>
          <p className="text-sm text-slate-600">Tier: Gold rewards</p>
          <p className="text-sm text-slate-600">Default address: New York, NY</p>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] text-slate-700">
              {isGlowhaus ? "SkinIQ synced" : "VitalTrack synced"}
            </Badge>
            <Badge className="rounded-full border border-black/10 bg-white text-slate-700">2 active subscriptions</Badge>
          </div>
        </Card>

        <Card className="space-y-3 border-black/10 p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Table>
            <thead>
              <tr>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>#{isGlowhaus ? "GH" : "VE"}-10492</TableCell>
                <TableCell>2026-03-10</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>$128.00</TableCell>
              </tr>
              <tr>
                <TableCell>#{isGlowhaus ? "GH" : "VE"}-10408</TableCell>
                <TableCell>2026-02-28</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>$94.00</TableCell>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
