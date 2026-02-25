import dynamic from "next/dynamic";
import { DottedGlowBackground } from "@/components/Effects/DottedGlowBackground";
import { Float } from "@/components/Effects/Float";
import { MouseGradientBg } from "@/components/Effects/MouseGradientBg";
import { NoiseOverlay } from "@/components/Effects/NoiseOverlay";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media/Media";
import RichText from "@/components/RichText";
import { CaroText } from "@/components/ui/CaroText";
import type { Page } from "@/payload-types";

const Marquee = dynamic(() =>
  import("@/components/Marquee").then((mod) => mod.Marquee),
);

export const Hero = (hero: Page["hero"]) => {
  const { richText, media, link, keywords: keywordsFromProps } = hero || {};
  const keywords: React.ReactNode[] =
    keywordsFromProps
      ?.split(",")
      .map((keyword: string) => (
        <CaroText key={keyword.trim()}>{keyword.trim()}</CaroText>
      )) || [];
  return (
    <div className="isolate relative flex flex-col bg-body min-h-svh overflow-clip clamp-[mb,-5,-12]">
      {/* <div className="z-10 relative flex justify-center items-center mb-8 container">
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
      </div> */}
      <DottedGlowBackground
        color={"rgb(234, 196, 64)"}
        glowColor={"rgb(234, 196, 64)"}
        speedMin={0.15}
        speedMax={1.5}
        speedScale={1.25}
        radius={3}
        opacity={1}
        gap={14}
        className="z-5 isolate absolute inset-0 mask-b-from-65% mask-t-from-55% mask-radial-to-90% pointer-events-none mask-radial-at-center"
      />
      <div className="relative flex flex-1 justify-center items-center w-full page-margin">
        <div className="max-lg:pt-20 w-full section-p">
          {media && typeof media === "object" && (
            <Float className="top-0 right-0 bottom-0 lg:absolute relative lg:w-[55%] lg:h-full pointer-events-none user-select-none mix-blend-lighten">
              <Media
                className="bg-contain! size-full object-contain"
                priority
                resource={media}
              />
            </Float>
          )}
          <NoiseOverlay className="z-4 isolate opacity-30 mix-blend-darken" />
          <div className="z-5 relative mt-[-10%] max-w-prose">
            {richText && (
              <RichText
                className="hero-text"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}
            {link && (
              <div className="flex gap-4 pb-28 clamp-[mt,8,12]">
                <CMSLink {...link} appearance="button" />
              </div>
            )}
          </div>
        </div>
      </div>
      <MouseGradientBg
        id="hero"
        size="50vmin"
        opacity={1}
        blendMode="mix-blend-overlay"
        className="absolute inset-0"
        innerClassName="mask-radial-to-[68vmin] mask-radial-at-center [--color:var(--color-accent)]"
      />
      {keywords.length > 0 && (
        <Marquee
          items={keywords}
          speed={0.5}
          className="left-0 absolute border-accent border-b w-full clamp-[bottom,5,12] clamp-[py,4,5]"
          itemClassName="text-xsmall text-primary clamp-[px,2,3]"
        />
      )}
    </div>
  );
};
