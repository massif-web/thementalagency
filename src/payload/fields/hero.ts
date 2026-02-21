import { HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import type { Field } from "payload";
import { link } from "@/payload/fields/link";

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
            HeadingFeature({ enabledHeadingSizes: ["h1"] }),
          ];
        },
      }),
      label: false,
    },
    link({
      appearances: false,
      overrides: {
        label: "Button",
        admin: {
          description: "Optionaler Link für den Button im Hero",
          hideGutter: false,
          className: "",
        },
      },
    }),
    // linkGroup({
    //   appearances: false,
    //   overrides: {
    //     maxRows: 1,
    //     label: "Button",
    //   },
    // }),
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
