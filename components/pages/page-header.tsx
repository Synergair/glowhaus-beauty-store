import { Badge } from "@/components/ui/badge";
import { brandConfig } from "@/lib/brand-config";

export function PageHeader({
  title,
  description,
  eyebrow
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <header className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white px-5 py-6 sm:px-7">
      <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-[var(--brand-accent-soft)] blur-2xl" />
      <div className="absolute -bottom-12 right-6 h-24 w-24 rounded-full bg-[var(--brand-accent-soft)] blur-2xl" />

      <div className="relative z-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {eyebrow ? (
            <Badge className="rounded-full border border-black/10 bg-[var(--brand-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
              {eyebrow}
            </Badge>
          ) : null}
          <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {isGlowhaus ? "SONAR • Beauty Conversion" : "SONAR • Wellness Conversion"}
          </Badge>
        </div>

        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p>
      </div>
    </header>
  );
}
