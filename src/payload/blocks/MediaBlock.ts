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
      type: "textarea",
      label: "Titel",
      admin: {
        className: "media-block-title",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Text",
    },
  ],
};
