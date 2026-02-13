import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const TitleBlock: Block = {
  slug: "titleBlock",
  labels: {
    singular: "Einleitung",
    plural: "Einleitungen",
  },

  fields: [
    {
      name: "preTitle",
      type: "text",
      label: "Spitzmarke",
    },
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        admin: {
          hideInsertParagraphAtEnd: true,
        },
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2"] }),
          ];
        },
      }),
      label: false,
    },
  ],
};
