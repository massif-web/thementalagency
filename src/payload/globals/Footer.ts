import type { GlobalConfig } from "payload";

import { link } from "@/payload/fields/link";
import { admins } from "../access/admins";
import { revalidateFooter } from "../hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: admins,
  },
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: "navItems",
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
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
