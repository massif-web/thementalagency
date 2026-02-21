import type { Block } from "payload";

export const FaqBlock: Block = {
  slug: "faqBlock",
  labels: {
    singular: "FAQ",
    plural: "FAQs",
  },
  fields: [
    {
      name: "entries",
      type: "array",
      label: "Einträge",
      labels: {
        singular: "Eintrag",
        plural: "Einträge",
      },
      fields: [
        {
          name: "question",
          type: "text",
          label: "Frage",
        },
        {
          name: "answer",
          type: "textarea",
          label: "Antwort",
        },
      ],
    },
  ],
};
