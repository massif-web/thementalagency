import { cn } from "@/utilities/ui";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn(
        "file:inline-flex flex bg-transparent selection:bg-primary file:bg-transparent disabled:opacity-50 shadow-xs px-3 py-1 border border-input aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive file:border-0 rounded-md aria-invalid:focus-visible:outline-none aria-invalid:outline-destructive/60 focus-visible:outline-1 dark:aria-invalid:outline-destructive aria-invalid:focus-visible:ring-[3px] aria-invalid:ring-destructive/20 focus-visible:ring-4 dark:aria-invalid:focus-visible:ring-4 dark:aria-invalid:ring-destructive/40 w-full min-w-0 h-9 file:h-7 file:font-medium selection:text-primary-foreground placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none",
        className,
      )}
      type={type}
      {...props}
    />
  );
};

export { Input };
