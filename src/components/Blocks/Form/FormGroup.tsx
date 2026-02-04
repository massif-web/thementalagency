import { cn } from "@/utilities/ui";
export const FormGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  width?: number | string;
}> = ({ children, className, width }) => {
  return (
    <div className={cn(`form-group`, width && `max-w-[${width}%]`, className)}>
      {children}
    </div>
  );
};
