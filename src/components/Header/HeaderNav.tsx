"use client";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";
import { CMSLink } from "@/components/Link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Header as HeaderType, Page } from "@/payload-types";
import { cn } from "@/utilities/ui";

export const HeaderNav = ({
  data,
  isLivePreview = false,
  isMobile = false,
}: {
  data: HeaderType;
  isLivePreview: boolean;
  isMobile?: boolean;
}) => {
  const [isOpen, setOpen] = useState(false);

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
    <>
      {isMobile && (
        <div className="lg:hidden top-1 right-4 z-10 absolute">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            duration={0.3}
            direction="right"
            distance="sm"
            label="Menü öffnen"
            color="currentColor"
          />
        </div>
      )}
      <nav
        className={cn(
          isMobile && !isOpen ? "hidden" : "flex",
          isMobile &&
            "bg-header flex-col justify-center items-center *:px-4 *:py-2 clamp-[py,10,12] clamp-[gap,6,8] *:text-xl",
          !isMobile &&
            "hidden lg:flex items-center *:px-4 *:py-2 clamp-[gap,4,8] *:text-sm",
          "*:hover:text-accent/50 *:uppercase *:tracking-wide *:transition-colors *:duration-300",
        )}
      >
        {navItems.map(({ link }, index) => {
          const key = `nav-link-${index}-${link?.url}`;
          return (
            <CMSLink
              key={key}
              {...link}
              {...(isMobile && { onClick: () => setOpen(false) })}
              className={cn(activeId === ids[index] && "text-accent")}
              isAnchor
              appearance="nav"
              prefetch={false}
              isLivePreview={isLivePreview}
            />
          );
        })}
      </nav>
    </>
  );
};
