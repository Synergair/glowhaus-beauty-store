"use client";

import type * as React from "react";
import {
  Sheet as RegistrySheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/registry/ui/sheet";
import { Button } from "@/components/ui/button";

export function Sheet({
  triggerLabel,
  title,
  children
}: {
  triggerLabel: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <RegistrySheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-9 rounded-full px-3 text-xs font-semibold">
          {triggerLabel}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm border-black/10 p-0">
        <SheetHeader className="border-b border-black/10 px-5 py-4">
          <SheetTitle className="text-base tracking-tight">{title}</SheetTitle>
          <SheetDescription className="text-xs">Navigate store sections and AI tools.</SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100dvh-82px)] overflow-auto px-4 py-5">{children}</div>
      </SheetContent>
    </RegistrySheet>
  );
}
