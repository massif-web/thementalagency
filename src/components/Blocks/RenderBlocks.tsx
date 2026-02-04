import type React from "react";
import { Fragment } from "react";
import { ArchiveBlock } from "@/components/Blocks/ArchiveBlock";
import { CallToActionBlock } from "@/components/Blocks/CallToAction";
import { ContentBlock } from "@/components/Blocks/Content";
import { FormBlock } from "@/components/Blocks/FormBlock";
import { MediaBlock } from "@/components/Blocks/MediaBlock";
import type { Page } from "@/payload-types";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={`block-${block.id}`}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
