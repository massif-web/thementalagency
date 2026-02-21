import type React from "react";
import { Media } from "@/components/Media/Media";
import { Card } from "@/components/ui/Card";
import type { CardsBlock as BlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { CMSLink } from "../Link";

export const CardsBlock: React.FC<BlockProps> = async (props) => {
  const { columns, style, link } = props;

  const colsSpanClasses = {
    full: "lg:col-span-12",
    half: "lg:col-span-6",
    oneThird: "lg:col-span-4",
    twoThirds: "lg:col-span-8",
    oneFourth: "lg:col-span-3",
  };

  return (
    <div className="clamp-[mt,16,24]">
      <div className="grid grid-cols-1 lg:grid-cols-12 clamp-[gap,6,10]">
        {columns &&
          columns.length > 0 &&
          columns.map(async (col, index) => {
            const key = `${col.id}-${index}`;
            const { icon, name, description, price, size } = col;
            const colSpan = size ? colsSpanClasses[size] : colsSpanClasses.full;
            return (
              <Card
                data-style={style}
                data-size={size}
                className={cn(`col-span-4 ${colSpan}`, {
                  "md:col-span-2": size !== "full",
                })}
                key={key}
              >
                <div className="flex items-center gap-4">
                  <Media className="w-7.5 text-accent" resource={icon} />
                  {name && <h3 className="text-accent h3">{name}</h3>}
                </div>
                {description && (
                  <p className="mt-4 max-w-[55ch] font-light">{description}</p>
                )}
                {price && (
                  <p className="relative mt-auto pt-[0.25em] font-bold text-accent text-right clamp-[bottom,-2,-6]">
                    {price}
                  </p>
                )}
              </Card>
            );
          })}
      </div>
      {link?.reference && (
        <div className="flex justify-center clamp-[mt,10,16]">
          <CMSLink {...link} appearance="button" />
        </div>
      )}
    </div>
  );
};
