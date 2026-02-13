import {
  ArchiveBlock,
  CallToActionBlock,
  CardsBlock,
  ContentBlock,
  FormBlock,
  MediaBlock,
  TitleBlock,
} from "@/components/Blocks";
import type { Page } from "@/payload-types";

const blockComponents = {
  titleBlock: TitleBlock,
  cardsBlock: CardsBlock,
  archiveBlock: ArchiveBlock,
  contentBlock: ContentBlock,
  callToActionBlock: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"];
  slug: string;
}> = (props) => {
  const { blocks, slug } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <div className="section-p" data-blocks={`blocks-${slug}`}>
        {blocks.map((block) => {
          const { blockType, ...blockProps } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              const BlockComponent = Block as React.FC<typeof blockProps>;
              return (
                <div key={`block-${block.id}`}>
                  <BlockComponent {...blockProps} />
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};
