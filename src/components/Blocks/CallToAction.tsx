import type React from "react";
import { CMSLink } from "@/components/Link";

import RichText from "@/components/RichText";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
}) => {
  return (
    <div className="container">
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-8 bg-card p-4 border border-border rounded">
        <div className="flex items-center max-w-3xl">
          {richText && (
            <RichText className="mb-0" data={richText} enableGutter={false} />
          )}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }) => {
            return <CMSLink key={link.url} size="lg" {...link} />;
          })}
        </div>
      </div>
    </div>
  );
};
