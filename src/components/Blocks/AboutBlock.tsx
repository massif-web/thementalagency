// import { FloatingDotsBackground } from "@/components/Effects/FloatingDotsBackground";

import RichText from "@/components/RichText";
import { CaroText } from "@/components/ui/CaroText";
import type { AboutBlock as BlockProps } from "@/payload-types";
import { MediaBlock, type Props as MediaBlockProps } from "./MediaBlock";

import { Todos } from "./Todos";
export const AboutBlock: React.FC<BlockProps> = (props) => {
  const { preTitle, richText, todoTitle, todos, media } = props;
  const mediaBlockProps: MediaBlockProps = {
    media: media || "",
    blockType: "mediaBlock",
    className: "mt-0",
    wrapperClassName: "w-full aspect-515/586",
    imgClassName: "absolute object-cover inset-0 size-full mix-blend-multiply",
  };

  return (
    <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
      <div className="flex flex-col gap-8 lg:col-span-2">
        <div>
          <CaroText className="font-light text-accent">{preTitle}</CaroText>
          <div className={"mt-4 max-w-[55ch]"}>
            {richText && (
              <RichText
                data={richText}
                className="title-text"
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        </div>
        {todos && (
          <div className="flex flex-col gap-6 mt-auto">
            {todoTitle && (
              <CaroText className="font-light text-accent">
                {todoTitle}
              </CaroText>
            )}
            <Todos todos={todos} className="items-start" />
          </div>
        )}
      </div>
      {media && (
        <div className="relative">
          <MediaBlock {...mediaBlockProps} />
        </div>
      )}
    </div>
  );
};
