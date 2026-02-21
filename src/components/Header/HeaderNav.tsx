"use client";
import { CMSLink } from "@/components/Link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Header as HeaderType, Page } from "@/payload-types";
import { cn } from "@/utilities/ui";

export const HeaderNav = ({
  data,
  isLivePreview = false,
}: {
  data: HeaderType;
  isLivePreview: boolean;
}) => {
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
  const scrollPadding =
    typeof window !== "undefined"
      ? parseInt(
          getComputedStyle(document.documentElement).scrollPaddingTop,
          10,
        )
      : 0;

  const activeId = useScrollSpy(ids, scrollPadding, isLivePreview);

  return (
    <nav className="flex items-center *:px-4 *:py-2 *:hover:text-accent/50 *:text-sm *:uppercase *:tracking-wide *:transition-colors *:duration-300 clamp-[gap,4,8]">
      {navItems.map(({ link }, index) => {
        const key = `nav-link-${index}-${link?.url}`;
        return (
          <CMSLink
            key={key}
            {...link}
            className={cn(activeId === ids[index] && "text-accent")}
            isAnchor
            appearance="nav"
            prefetch={false}
            isLivePreview={isLivePreview}
          />
        );
      })}
    </nav>
  );
};
