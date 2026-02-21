import type { HrBlock as BlockProps } from "@/payload-types";
export const HrBlock: React.FC<BlockProps> = () => {
  return (
    <div className="clamp-[my,20,28]">
      <hr className="border-accent/50 border-t" />
    </div>
  );
};
