import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import type { Field } from "payload";

import { linkGroup } from "@/payload/fields/linkGroup";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "media",
      type: "upload",
      // admin: {
      //   condition: (_, { type } = {}) =>
      //     ["highImpact", "mediumImpact"].includes(type),
      // },
      relationTo: "media",
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
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "keywords",
      type: "textarea",
      admin: {
        description:
          "Kommagetrennte Liste von Schlüsselwörtern für animiertes Band",
      },
    },
  ],
  label: false,
};
