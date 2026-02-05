"use client";
import Link, { type LinkProps } from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/utilities/ui";

type NavLinkType = {
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  href?: string | null;
  isAnchor?: boolean;
} & LinkProps;

export const NavLink = ({
  children,
  className,
  activeClassName = "text-accent",
  href,
  isAnchor,
  ...props
}: NavLinkType) => {
  const segments = useSelectedLayoutSegments();
  const isActive = isAnchor ? false : href === `/${segments.join("/")}`;
  return (
    <Link
      className={cn(className, isActive && activeClassName)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
