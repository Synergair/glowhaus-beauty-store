import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
