import type { StaticImageData } from "next/image";
import type React from "react";
import { ConvertToBrs } from "@/components/ConvertToBrs";
import { NoiseOverlay } from "@/components/Effects/NoiseOverlay";
import { Media } from "@/components/Media/Media";
import type { MediaBlock as BlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";

export type Props = BlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  wrapperClassName?: string;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = ({
  className,
  imgClassName,
  wrapperClassName = "img-wrapper",
  media,
  staticImage,
  title,
  description,
}) => {
  const titleWithBreaks = <ConvertToBrs string={title || ""} />;

  return (
    <div className={cn("media-block component:clamp-[mt,16,24]", className)}>
      <div className="corners" />
      <div className={cn(wrapperClassName)}>
        <Media
          className={cn(imgClassName)}
          resource={media}
          src={staticImage}
        />
        {title || description ? (
          <div className="content-wrapper">
            <div className="richtext">
              {title && <h3 className="h3">{titleWithBreaks}</h3>}
              {description && <p className="text-small">{description}</p>}
            </div>
          </div>
        ) : null}
      </div>
      <NoiseOverlay className="z-5 opacity-30 mix-blend-soft-light" />
    </div>
  );
};
