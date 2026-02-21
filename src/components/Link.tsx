import Link from "next/link";
import type React from "react";
import { NavLink } from "@/components/NavLink";
import { Button, type ButtonProps } from "@/components/ui/Button";
import type { Page } from "@/payload-types";
import { cn } from "@/utilities/ui";

type CMSLinkType = {
  appearance?: "button" | "inline" | "nav" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages";
    value: Page | string | number;
  } | null;
  size?: ButtonProps["size"] | null;
  type?: "custom" | "reference" | "anchor" | null;
  url?: string | null;
  isAnchor?: boolean;
  prefetch?: boolean;
  isLivePreview?: boolean;
};

export const CMSLink = (props: CMSLinkType) => {
  const {
    type,
    appearance = "default",
    children,
    className,
    label: labelFromProps,
    newTab,
    reference,
    size: sizeFromProps,
    url: urlFromProps,
    isAnchor,
  } = props;

  const label =
    labelFromProps ??
    (typeof reference?.value === "object" ? reference.value.title : null);

  const url =
    (type === "reference" || type === "anchor") &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? reference.value.slug
      : urlFromProps;

  if (!url) return null;
  const href =
    type === "anchor" || isAnchor
      ? `#${url}`
      : url === "home"
        ? ""
        : type === "custom"
          ? `${url}`
          : `/${url}`;

  const size = appearance === "link" ? "clear" : sizeFromProps;
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label}
        {children}
      </Link>
    );
  }

  if (appearance === "nav") {
    return (
      <NavLink
        className={cn(className)}
        href={href}
        isAnchor={isAnchor}
        {...props}
      >
        {label}
        {children}
      </NavLink>
    );
  }

  if (appearance === "button") {
    return (
      <Button
        asChild
        className={className}
        size={"primary"}
        variant={"primary"}
      >
        <Link className={cn(className)} href={href} {...newTabProps}>
          <span>
            <span>
              {label}
              {children}
            </span>
          </span>
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label}
        {children}
      </Link>
    </Button>
  );
};
