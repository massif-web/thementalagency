import type React from "react";
import RichText from "@/components/RichText";
import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";

import { CMSLink } from "../Link";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: "lg:col-span-12",
    half: "lg:col-span-6",
    oneThird: "lg:col-span-4",
    twoThirds: "lg:col-span-8",
  };

  return (
    <div className="my-16 container">
      <div className="gap-x-16 gap-y-8 grid grid-cols-4 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const key = `${col.id}-${index}`;
            const { enableLink, link, richText, size } = col;
            const colSpan = size ? colsSpanClasses[size] : colsSpanClasses.full;
            return (
              <div
                className={cn(`col-span-4 ${colSpan}`, {
                  "md:col-span-2": size !== "full",
                })}
                key={key}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
