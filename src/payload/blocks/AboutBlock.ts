import type { Block } from "payload";
import { titleFields } from "@/payload/fields/title";
import { todoField } from "@/payload/fields/todos";

export const AboutBlock: Block = {
  slug: "aboutBlock",
  labels: {
    singular: "Über mich",
    plural: "Über mich",
  },
  fields: [
    ...titleFields,
    {
      name: "media",
      type: "upload",
      label: "Bild",
      relationTo: "media",
    },
    {
      name: "todoTitle",
      type: "text",
      label: "Titel für Kurz & Knapp Sätze",
    },
    { ...todoField },
  ],
};
