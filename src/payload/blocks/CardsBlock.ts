import type { Block, Field } from "payload";

import { link } from "@/payload/fields/link";

const cardFields: Field[] = [
  {
    name: "size",
    label: "Breite",
    type: "select",
    defaultValue: "half",
    admin: {
      style: { maxWidth: "max-content" },
    },
    options: [
      {
        label: "Viertel",
        value: "oneFourth",
      },
      {
        label: "Ein Drittel",
        value: "oneThird",
      },
      {
        label: "Hälfte",
        value: "half",
      },
      {
        label: "Zwei Drittel",
        value: "twoThirds",
      },
      {
        label: "Ganze Breite",
        value: "full",
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "icon",
        type: "upload",
        relationTo: "media",
        admin: {
          width: "50%",
          condition: (_data, _siblingData, { blockData }) =>
            blockData?.style === "icons",
        },
        required: true,
      },
      {
        name: "name",
        type: "text",
        label: "Titel",
        required: true,
        admin: {
          width: "50%",
        },
      },
    ],
  },
  {
    name: "description",
    type: "textarea",
    label: "Text",
    required: true,
  },
  {
    name: "price",
    type: "text",
    label: "Dauer/Preis",
    required: true,
    admin: {
      style: { width: "100px" },
      condition: (_data, _siblingData, { blockData }) =>
        blockData?.style === "price",
    },
  },
];

export const CardsBlock: Block = {
  slug: "cardsBlock",
  labels: {
    singular: "Kacheln",
    plural: "Kacheln",
  },
  fields: [
    {
      name: "style",
      label: "Style",
      type: "select",
      defaultValue: "icons",
      options: [
        {
          label: "Mit Icons",
          value: "icons",
        },
        {
          label: "Mit Zeit- /Preisangabe",
          value: "price",
        },
        {
          label: "Als FAQ",
          value: "faq",
        },
      ],
    },
    {
      name: "columns",
      type: "array",
      label: "Spalten",
      labels: {
        singular: "Spalte",
        plural: "Spalten",
      },
      admin: {
        initCollapsed: false,
      },
      fields: cardFields,
    },
    {
      type: "collapsible",
      label: "Button unter den Kacheln",
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          appearances: false,
          overrides: {
            required: false,
            label: "Button",
            admin: {
              description: "Optional",
              hideGutter: false,
              className: "",
            },
          },
        }),
      ],
    },
  ],
};
