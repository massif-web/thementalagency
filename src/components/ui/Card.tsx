import { cn } from "@/utilities/ui";

export type CardProps = {
  className?: string;
  children?: React.ReactNode;
};
export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(`card`, className)} {...props}>
      <div className="corner" />
      <div className="inner">{children}</div>
    </div>
  );
};
