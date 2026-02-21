import { Button } from "@/components/ui/Button";

type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const PrimaryButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Button variant="primary" size="primary" {...props}>
      <span>
        <span>{children}</span>
      </span>
    </Button>
  );
};
