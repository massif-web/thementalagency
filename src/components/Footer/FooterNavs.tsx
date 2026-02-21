import { CMSLink } from "@/components/Link";
import type {
  Footer as FooterType,
  Header as HeaderType,
} from "@/payload-types";
import { cn } from "@/utilities/ui";

type Props = {
  items:
    | FooterType["items"]
    | HeaderType["navItems"]
    | FooterType["socialLinks"];
  gap?: "sm" | "md" | "lg";
  type?: "reference" | "custom";
  isAnchor?: boolean;
  newTab?: boolean;
  prefetch?: boolean;
  isLivePreview: boolean;
  className?: string;
};
export const FooterNav: React.FC<Props> = ({
  items,
  gap = "md",
  className,
  isAnchor = false,
  newTab = false,
  prefetch = true,
  isLivePreview,
}) => {
  const gapClass = {
    sm: "clamp-[gap,3,6]",
    md: "clamp-[gap,4,8]",
    lg: "clamp-[gap,6,12]",
  }[gap];
  return (
    <nav
      className={cn(
        "flex items-center *:hover:text-accent *:transition-colors *:duration-300",
        gapClass,
        className,
      )}
    >
      {items?.map(({ link }, index) => {
        const key = `nav-link-${index}-${link?.url}`;
        return (
          <CMSLink
            key={key}
            {...link}
            isAnchor={isAnchor}
            newTab={newTab}
            appearance="nav"
            prefetch={prefetch}
            isLivePreview={isLivePreview}
          />
        );
      })}
    </nav>
  );
};
