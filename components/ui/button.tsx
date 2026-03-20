import * as React from "react";
import { Button as RegistryButton, buttonVariants } from "@/components/registry/ui/button";
import { cn } from "@/lib/utils";

type RegistryProps = React.ComponentProps<typeof RegistryButton>;
type Variant = NonNullable<RegistryProps["variant"]> | "accent";

interface ButtonProps extends Omit<RegistryProps, "variant"> {
  variant?: Variant;
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  if (variant === "accent") {
    return (
      <RegistryButton
        variant="default"
        className={cn("bg-[var(--brand-accent)] text-white hover:brightness-95", className)}
        {...props}
      />
    );
  }

  return <RegistryButton variant={variant} className={className} {...props} />;
}

export { buttonVariants };
