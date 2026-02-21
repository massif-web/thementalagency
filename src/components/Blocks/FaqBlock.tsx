import type React from "react";
import { FaqItem } from "@/components/ui/FaqItem";
import type { FaqBlock as BlockProps } from "@/payload-types";

export const FaqBlock: React.FC<BlockProps> = async (props) => {
  const { entries } = props;

  return (
    <div className="flex flex-col gap-4 clamp-[mt,16,24]">
      {entries &&
        entries.length > 0 &&
        entries.map(async (entry, index) => {
          const { question, answer, id } = entry;
          const key = `${id}-${index}`;
          return (
            <FaqItem
              question={question || ""}
              answer={answer || ""}
              key={key}
            />
          );
        })}
    </div>
  );
};
