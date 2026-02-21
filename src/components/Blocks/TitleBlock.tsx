import RichText from "@/components/RichText";
import { CaroText } from "@/components/ui/CaroText";
import type { TitleBlock as BlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Todos } from "./Todos";

export const TitleBlock: React.FC<BlockProps> = (props) => {
  const { style, preTitle, richText, todos } = props;
  const isCentered = style === "centered";

  return (
    <div className={cn({ "grid lg:grid-cols-2": todos })}>
      <div>
        <CaroText
          className={cn("font-light text-accent", {
            "justify-center": isCentered,
          })}
        >
          {preTitle}
        </CaroText>
        <div
          className={cn("mt-4 max-w-[55ch]", {
            "mx-auto text-center": isCentered,
          })}
        >
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
        <div className="flex justify-end items-center">
          <Todos todos={todos} className="items-end" />
        </div>
      )}
    </div>
  );
};
