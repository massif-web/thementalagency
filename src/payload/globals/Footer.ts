import type { GlobalConfig } from "payload";

import { link } from "@/payload/fields/link";
import { revalidateFooter } from "../hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      label: "Footer Menü",
      labels: {
        singular: "Menüeintrag",
        plural: "Menüeinträge",
      },
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/payload/components/RowLabel#RowLabel",
        },
      },
    },
    {
      name: "socialLinks",
      label: "Social Links",
      type: "array",
      fields: [
        link({
          appearances: false,
          overrides: {
            fields: [
              {
                name: "type",
                type: "text",
                hidden: true,
                virtual: true,
                defaultValue: "custom",
              },
            ],
          },
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/payload/components/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
