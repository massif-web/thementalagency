"use client";
import { CMSLink } from "@/components/Link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Header as HeaderType, Page } from "@/payload-types";
import { cn } from "@/utilities/ui";

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || [];
  const ids = navItems.map((item) => {
    const { link } = item;
    const value =
      link &&
      link.type === "reference" &&
      link.reference &&
      typeof link.reference.value === "object"
        ? (link.reference?.value as Page)
        : null;
    return value?.slug || "";
  });
  const activeId = useScrollSpy(ids);

  return (
    <nav className="flex items-center fl-gap-4/8 *:px-4 *:py-2 *:hover:text-accent/50 *:text-sm *:uppercase *:tracking-wide *:transition-colors *:duration-300">
      {navItems.map(({ link }, index) => {
        const key = `nav-link-${index}-${link?.url}`;
        return (
          <CMSLink
            key={key}
            {...link}
            className={cn(activeId === ids[index] && "text-accent")}
            isAnchor
            appearance="nav"
          />
        );
      })}
    </nav>
  );
};
