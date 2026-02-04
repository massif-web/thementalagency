"use client";
import type React from "react";
import { useEffect } from "react";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media/Media";
import RichText from "@/components/RichText";
import type { Page } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  return (
    <div
      className="relative flex justify-center items-center -mt-[10.4rem] text-white"
      data-theme="dark"
    >
      <div className="z-10 relative flex justify-center items-center mb-8 container">
        <div className="max-w-146 md:text-center">
          {richText && (
            <RichText className="mb-6" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={`link-${i}-${link?.url || ""}`}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === "object" && (
          <Media
            fill
            pictureClassName="-z-10 absolute inset-0"
            imgClassName="object-cover"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  );
};
