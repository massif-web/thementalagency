import type React from "react";
import { Card, type CardPostData } from "@/components/Card";
import { cn } from "@/utilities/ui";

export type Props = {
  posts: CardPostData[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="gap-x-4 gap-y-4 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12">
          {posts?.map((result) => {
            if (typeof result === "object" && result !== null) {
              return (
                <div className="col-span-4" key={result.slug}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo="posts"
                    showCategories
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};
