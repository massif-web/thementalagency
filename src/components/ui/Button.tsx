import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/ui";

const buttonVariants = cva("group button", {
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
      primary: "btn-primary",
      destructive:
        "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
      outline:
        "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
      secondary:
        "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline",
    },
    size: {
      primary: "",
      clear: "",
      default: "h-10 px-4 py-2 has-[>svg]:px-3",
      sm: "h-9 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-11 rounded-md px-8 has-[>svg]:px-4",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
