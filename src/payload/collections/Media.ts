import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: {
      en: "Media",
      de: "Medium",
    },
    plural: {
      en: "Media",
      de: "Medien",
    },
  },
  trash: true,
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      label: "Verknüpfte Seiten",
      name: "pages",
      type: "join",
      collection: "pages",
      on: "hero.media",
      admin: {
        allowCreate: false,
        defaultColumns: ["title", "updatedAt"],
      },
    },
    {
      label: "Verknüpfte SEO-Daten",
      name: "seo",
      type: "join",
      collection: "pages",
      on: "meta.image",
      admin: {
        allowCreate: false,
        defaultColumns: ["title", "updatedAt"],
      },
    },
    // {
    //   label: "Verknüpfte Inhalte",
    //   name: "content",
    //   type: "join",
    //   collection: "pages",
    //   on: "layout.mediaBlock.media",
    //   admin: {
    //     allowCreate: false,
    //     defaultColumns: ["title", "updatedAt"],
    //   },
    // },
    {
      name: "alt",
      type: "text",
      //required: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: "public/media",
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "opengraph",
        width: 1200,
        height: 630,
        withoutEnlargement: true,
        fit: "cover",
      },
      {
        name: "ogX",
        width: 2500,
        withoutEnlargement: true,
      },
      {
        name: "ogY",
        height: 2500,
        withoutEnlargement: true,
      },
    ],
  },
};
