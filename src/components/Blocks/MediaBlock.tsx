import type { StaticImageData } from "next/image";
import type React from "react";
import RichText from "@/components/RichText";
import type { MediaBlock as BlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";

import { Media } from "../Media/Media";

type Props = BlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, imgClassName, media, staticImage } = props;

  return (
    <div className={cn("fl-mt-16/24 full-width-image", className)}>
      <Media
        imgClassName={cn(imgClassName)}
        resource={media}
        src={staticImage}
      />
      {/* {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )} */}
    </div>
  );
};
