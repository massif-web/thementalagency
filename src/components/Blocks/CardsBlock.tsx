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
    <div className="fl-mt-16/24">
      <div className="fl-gap-6/10 grid grid-cols-1 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map(async (col, index) => {
            const key = `${col.id}-${index}`;
            const { icon, name, description, price, size } = col;
            const colSpan = size ? colsSpanClasses[size] : colsSpanClasses.full;
            return (
              <Card
                data-style={style}
                className={cn(`col-span-4 ${colSpan}`, {
                  "md:col-span-2": size !== "full",
                })}
                key={key}
              >
                <div className="flex items-center gap-4">
                  <Media className="w-7.5 text-accent" resource={icon} />
                  {name && (
                    <h3 className="font-medium text-accent fl-text-2xl/3xl uppercase tracking-wide">
                      {name}
                    </h3>
                  )}
                </div>
                {description && (
                  <p className="mt-2 font-light">{description}</p>
                )}
                {price && <p className="font-bold">{price}</p>}
              </Card>
            );
          })}
      </div>
      {link?.reference && (
        <div className="flex justify-center mt-8">
          <CMSLink {...link} appearance="button" />
        </div>
      )}
    </div>
  );
};
