"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/ui";

const labelVariants = cva(
  "peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed",
);

const Label: React.FC<
  { ref?: React.Ref<HTMLLabelElement> } & React.ComponentProps<
    typeof LabelPrimitive.Root
  > &
    VariantProps<typeof labelVariants>
> = ({ className, ref, ...props }) => (
  <LabelPrimitive.Root
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
);

export { Label };
