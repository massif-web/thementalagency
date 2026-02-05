import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media/Media";
import RichText from "@/components/RichText";
import type { Page } from "@/payload-types";
import { DottedGlowBackground } from "../Effects/DottedGlowBackground";
import { MouseGradientBg } from "../Effects/MouseGradientBg";

export const Hero = ({
  links,
  media,
  richText,
  keywords: keywordsFromProps,
}: Page["hero"]) => {
  const keywords: string[] = keywordsFromProps
    .split(",")
    .map((keyword: string) => keyword.trim());
  return (
    <>
      <div className="isolate relative flex justify-center items-center bg-body min-h-svh">
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
          glowColor={"rgb(255, 255, 255)"}
          speedMin={0.15}
          speedMax={1.5}
          speedScale={1.25}
          radius={2}
          opacity={0.4}
          gap={14}
          className="isolate absolute inset-0 mask-b-from-65% mask-t-from-55% mask-radial-to-90% pointer-events-none mask-radial-at-center"
        />
        <div className="w-full section-p">
          <div className="mt-[-10%] max-w-prose">
            {richText && (
              <RichText
                className="hero-text"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4 fl-mt-8/12">
                {links.map(({ link }, i) => {
                  return (
                    <li key={`link-${i}-${link?.url || ""}`}>
                      <CMSLink {...link} appearance="link" />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {media && typeof media === "object" && (
            <Media
              className="top-0 right-0 bottom-0 absolute w-[55%] h-full object-contain mix-blend-lighten"
              priority
              resource={media}
            />
          )}
        </div>
        <MouseGradientBg
          id="hero"
          size="50vmin"
          opacity={1}
          blendMode="mix-blend-overlay"
          className="absolute inset-0"
          innerClassName="mask-radial-to-[68vmin] mask-radial-at-center [--color:var(--color-accent)]"
        />
      </div>
      {keywords.length > 0 && (
        <div className="bottom-0 left-0 absolute w-full overflow-hidden whitespace-nowrap pointer-events-none keywords-marquee">
          {keywords.map((keyword, index) => {
            const key = `${keyword}-${index}`;
            return (
              <span key={key} className="keyword">
                {keyword}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};
