import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Field } from "payload";

export const titleFields: Field[] = [
  {
    name: "style",
    type: "select",
    label: "Stil",
    admin: {
      style: { maxWidth: "max-content" },
    },
    options: [
      {
        label: "Linksbündig",
        value: "standard",
      },
      {
        label: "Zentriert",
        value: "centered",
      },
    ],
    defaultValue: "standard",
  },
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
    label: "Titel & Text",
  },
];
