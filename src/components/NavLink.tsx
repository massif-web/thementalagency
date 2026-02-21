"use client";
import type { LinkProps } from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/utilities/ui";

type NavLinkType = {
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  href?: string | null;
  isAnchor?: boolean;
  isLivePreview?: boolean;
  newTab?: boolean | null;
} & LinkProps;

export const NavLink = ({
  children,
  className,
  activeClassName = "text-accent",
  href,
  isAnchor,
  prefetch: _prefetch,
  isLivePreview = false,
  newTab: _newTab,
  ...props
}: NavLinkType) => {
  const segments = useSelectedLayoutSegments();
  const isActive = isAnchor
    ? isLivePreview && href === `#${segments.join("/")}`
    : href === `/${segments.join("/")}`;
  return (
    <a
      className={cn(className, isActive && activeClassName)}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
};
