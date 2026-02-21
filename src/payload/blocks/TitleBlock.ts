import type { Block } from "payload";
import { titleFields } from "@/payload/fields/title";
import { todoField } from "@/payload/fields/todos";

export const TitleBlock: Block = {
  slug: "titleBlock",
  labels: {
    singular: "Titel / Einleitung",
    plural: "Titel / Einleitungen",
  },

  fields: [...titleFields, { ...todoField }],
};
