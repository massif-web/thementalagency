import dynamic from "next/dynamic";
import { Contact } from "@/components/Blocks/Contact/Contact";
import { ConvertToBrs } from "@/components/ConvertToBrs";
import { MouseGradientBg } from "@/components/Effects/MouseGradientBg";
import type { ContactBlock as BlockProps } from "@/payload-types";

const DottedGlowBackground = dynamic(() =>
  import("@/components/Effects/DottedGlowBackground").then(
    (mod) => mod.DottedGlowBackground,
  ),
);

export const ContactBlock: React.FC<BlockProps> = (props) => {
  const { title, description, buttonLabel, formGroup } = props;
  const titleWithBreaks = <ConvertToBrs string={title || ""} />;

  return (
    <div className="isolate relative flex justify-center items-center bg-body min-h-[80svh] overflow-clip clamp-[mb,10,24]">
      <DottedGlowBackground
        color={"rgb(234, 196, 64)"}
        glowColor={"rgb(234, 196, 64)"}
        speedMin={0.15}
        speedMax={1.5}
        speedScale={1.25}
        radius={3}
        opacity={1}
        gap={14}
        className="z-5 isolate absolute inset-0 pointer-events-none mask-intersect mask-[linear-gradient(to_right,transparent_1%,black_10%,transparent_45%,transparent_55%,black_90%,transparent_99%),linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_top,transparent_0%,black_20%)]"
      />
      <div className="mx-auto text-center section-p">
        <Contact formGroup={formGroup} buttonLabel={buttonLabel}>
          {title || description || buttonLabel ? (
            <div className="richtext">
              {title && <h3 className="h3">{titleWithBreaks}</h3>}
              {description && (
                <p className="max-w-prose text-balance clamp-[text,lg,xl]">
                  {description}
                </p>
              )}
            </div>
          ) : null}
        </Contact>
      </div>
      <MouseGradientBg
        id="kontakt"
        size="50vmin"
        opacity={1}
        blendMode="mix-blend-overlay"
        className="absolute inset-0"
        innerClassName="mask-intersect mask-[linear-gradient(to_right,transparent_1%,black_10%,transparent_45%,transparent_55%,black_90%,transparent_99%),linear-gradient(to_bottom,transparent_0%,black_20%),linear-gradient(to_top,transparent_0%,black_20%)] [--color:var(--color-accent)]"
      />
    </div>
  );
};
