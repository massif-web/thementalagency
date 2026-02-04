import type { PayloadRequest } from "payload";

import { checkRole } from "./checkRole";

export const adminsAndUser = ({ req: { user } }: { req: PayloadRequest }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return Boolean({
      id: { equals: user.id },
    });
  }

  return false;
};
