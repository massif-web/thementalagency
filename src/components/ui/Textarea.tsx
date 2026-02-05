import { cn } from "@/utilities/ui";

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex bg-transparent disabled:opacity-50 shadow-xs px-3 py-2 border border-input aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive rounded-md aria-invalid:focus-visible:outline-none aria-invalid:outline-destructive/60 focus-visible:outline-1 dark:aria-invalid:outline-destructive aria-invalid:focus-visible:ring-[3px] aria-invalid:ring-destructive/20 focus-visible:ring-4 dark:aria-invalid:focus-visible:ring-4 dark:aria-invalid:ring-destructive/40 w-full min-h-16 placeholder:text-muted-foreground md:text-sm text-base transition-[color,box-shadow] field-sizing-content disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
