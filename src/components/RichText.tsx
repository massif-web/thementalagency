import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react";
import { BannerBlock } from "@/components/Blocks/Banner";
import { CallToActionBlock } from "@/components/Blocks/CallToAction";
import { CodeBlock, type CodeBlockProps } from "@/components/Blocks/CodeBlock";
import { MediaBlock } from "@/components/Blocks/MediaBlock";
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";
import { cn } from "@/utilities/ui";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps
    >;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  // biome-ignore lint: yes, we want to assert this
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag; // 'h1', 'h2', etc.
    const children = nodesToJSX({ nodes: node.children });

    // Add your custom classes based on heading level
    const classNames = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      // etc.
    } as Record<string, string>;

    return (
      <Tag
        className={cn("[&>em]:text-accent [&>em]:not-italic", classNames[Tag])}
      >
        {children}
      </Tag>
    );
  },
  blocks: {
    bannerBlock: ({
      node,
    }: {
      node: SerializedBlockNode<BannerBlockProps>;
    }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-3xl"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    codeBlock: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock className="col-start-2" {...node.fields} />
    ),
    callToActionBlock: ({
      node,
    }: {
      node: SerializedBlockNode<CTABlockProps>;
    }) => <CallToActionBlock {...node.fields} />,
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
