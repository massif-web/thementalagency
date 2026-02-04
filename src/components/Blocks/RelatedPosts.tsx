import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import clsx from "clsx";
import type React from "react";
import RichText from "@/components/RichText";
import type { Post } from "@/payload-types";
import { Card } from "../Card";

export type RelatedPostsProps = {
  className?: string;
  docs?: Post[];
  introContent?: DefaultTypedEditorState;
};

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props;

  return (
    <div className={clsx("lg:container", className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="items-stretch gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
        {docs?.map((doc, index) => {
          if (typeof doc === "string") return null;
          const key = `${doc.id}-${index}`;
          return <Card key={key} doc={doc} relationTo="posts" showCategories />;
        })}
      </div>
    </div>
  );
};
