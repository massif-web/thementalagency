"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utilities/ui";

const Select: React.FC<React.ComponentProps<typeof SelectPrimitive.Root>> = (
  props,
) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
};

const SelectGroup: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Group>
> = (props) => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
};

const SelectValue: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Value>
> = (props) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
};

const SelectTrigger: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Trigger>
> = ({ children, className, ...props }) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "border-input data-placeholder:text-muted-foreground aria-invalid:border-destructive ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="opacity-50 size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectContent: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Content>
> = ({ children, className, position = "popper", ...props }) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "data-[side=left]:slide-in-from-right-2 data-[side=top]:slide-in-from-bottom-2 z-50 relative bg-popover data-[side=bottom]:slide-in-from-top-2 data-[side=right]:slide-in-from-left-2 shadow-md border rounded-md min-w-32 max-h-96 overflow-hidden text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectLabel: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Label>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 font-semibold text-sm", className)}
      {...props}
    />
  );
};

const SelectItem: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Item>
> = ({ children, className, ...props }) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="right-2 absolute flex justify-center items-center size-3.5">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

const SelectSeparator: React.FC<
  React.ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 bg-border h-px pointer-events-none", className)}
      {...props}
    />
  );
};

const SelectScrollUpButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex justify-center items-center py-1 cursor-default",
        className,
      )}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
};

const SelectScrollDownButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex justify-center items-center py-1 cursor-default",
        className,
      )}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
};

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
