"use client";

import type {
  PayloadAdminBarProps,
  PayloadMeUser,
} from "@payloadcms/admin-bar";
import { PayloadAdminBar } from "@payloadcms/admin-bar";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import React, { useState } from "react";
import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";

const baseClass = "admin-bar";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar = ({
  className,
  adminBarProps,
}: {
  className?: string;
  adminBarProps?: PayloadAdminBarProps;
}) => {
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels]
      ? segments[1]
      : "pages"
  ) as keyof typeof collectionLabels;
  const router = useRouter();

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <div
      className={cn(
        baseClass,
        "py-2 bg-black text-white max-sm:hidden",
        className,
        {
          block: show,
          hidden: !show,
        },
      )}
    >
      <div className="container">
        <PayloadAdminBar
          className="py-2 text-white"
          {...adminBarProps}
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch("/next/exit-preview").then(() => {
              router.push("/");
              router.refresh();
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
