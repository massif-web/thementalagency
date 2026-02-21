import { cn } from "@/utilities/ui";
export const CaroText = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn("flex items-center component:gap-2 caro-text", className)}
    >
      <span className="bg-accent size-[0.65em] aspect-square rotate-45" />
      {children}
    </span>
  );
};
