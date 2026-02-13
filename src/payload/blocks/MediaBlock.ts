import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  labels: {
    singular: "Vollbild mit Text",
    plural: "Vollbilder mit Text",
  },
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "title",
      type: "text",
      label: "Titel",
      admin: {
        width: "50%",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Text",
    },
  ],
};
