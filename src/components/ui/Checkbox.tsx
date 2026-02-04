"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/utilities/ui";

const Checkbox: React.FC<
  React.ComponentProps<typeof CheckboxPrimitive.Root>
> = ({ className, ...props }) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      "peer data-[state=checked]:bg-primary disabled:opacity-50 shadow-xs border border-input data-[state=checked]:border-primary rounded-lg outline-ring/50 focus-visible:outline-1 dark:outline-ring/40 ring-ring/10 aria-invalid:focus-visible:ring-0 focus-visible:ring-4 dark:ring-ring/20 size-4 data-[state=checked]:text-primary-foreground transition-[color,box-shadow] disabled:cursor-not-allowed shrink-0",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex justify-center items-center text-current"
    >
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
