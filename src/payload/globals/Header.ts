import type { GlobalConfig } from "payload";

import { link } from "@/payload/fields/link";
import { admins } from "../access/admins";
import { revalidateHeader } from "../hooks/revalidateHeader";

export const Header: GlobalConfig = {
  slug: "header",
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
    afterChange: [revalidateHeader],
  },
};
