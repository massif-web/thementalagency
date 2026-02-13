import RichText from "@/components/RichText";
import { CaroText } from "@/components/ui/CaroText";
import type { TitleBlock as BlockProps } from "@/payload-types";

export const TitleBlock: React.FC<BlockProps> = (props) => {
  const { preTitle, richText } = props;

  return (
    <div className="max-w-[55ch]">
      <CaroText className="font-light text-accent text-sm uppercase tracking-wide">
        {preTitle}
      </CaroText>
      <div className={"mt-4"}>
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
  );
};
