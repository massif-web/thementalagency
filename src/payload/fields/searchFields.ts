import type { Field } from "payload";

export const searchFields: Field[] = [
  {
    name: "slug",
    label: {
      en: "Slug",
      de: "Pfad",
    },
    type: "text",
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: "meta",
    label: "Meta",
    type: "group",
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: "text",
        name: "title",
      },
      {
        type: "text",
        name: "description",
      },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
  {
    label: {
      en: "Categories",
      de: "Kategorien",
    },
    name: "categories",
    type: "array",
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: "relationTo",
        type: "text",
      },
      {
        name: "categoryID",
        type: "text",
      },
      {
        name: "title",
        type: "text",
      },
    ],
  },
];
