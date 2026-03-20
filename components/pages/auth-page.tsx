import Link from "next/link";
import { PageHeader } from "@/components/pages/page-header";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export function AuthPage({ slug }: { slug: "login" | "register" | "forgot-password" }) {
  const isLogin = slug === "login";
  const isRegister = slug === "register";
  const isForgotPassword = slug === "forgot-password";
  const isGlowhaus = (brandConfig.key as string) === "glowhaus";

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title={isLogin ? "Sign In" : isRegister ? "Create Account" : "Reset Password"}
        description={
          isLogin
            ? "Access orders, subscriptions, AI tools, and loyalty perks."
            : isRegister
              ? "Create your account for faster checkout and personalized recommendations."
              : "Enter your email and we will send reset instructions."
        }
        eyebrow="Account"
      />

      <div className="rounded-xl border border-black/10 bg-[var(--brand-accent-soft)] px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-600">
          <span>{isGlowhaus ? "Guided account flow" : "Progress account flow"}</span>
          <span>{isForgotPassword ? "Recovery" : isRegister ? "Signup" : "Signin"}</span>
        </div>
        <Progress value={isForgotPassword ? 40 : isRegister ? 75 : 55} />
      </div>

      <Card className="space-y-4 border-black/10 p-6">
        {isRegister ? (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Full name" />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        {!isForgotPassword ? (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        ) : null}

        <Button variant="accent" className="w-full rounded-full">
          {isLogin ? "Sign in" : isRegister ? "Create account" : "Send reset link"}
        </Button>

        {isLogin ? (
          <div className="flex items-center justify-between text-xs text-slate-600">
            <Link href="/forgot-password">Forgot password</Link>
            <Link href="/register">Create account</Link>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
