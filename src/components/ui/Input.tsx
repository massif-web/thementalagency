import { cn } from "@/utilities/ui";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input data-slot="input" className={cn(className)} type={type} {...props} />
  );
};

export { Input };
