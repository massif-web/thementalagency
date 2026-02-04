import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { admins } from "../access/admins";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: {
      en: "Category",
      de: "Kategorie",
    },
    plural: {
      en: "Categories",
      de: "Kategorien",
    },
  },
  access: {
    admin: admins,

    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
};
