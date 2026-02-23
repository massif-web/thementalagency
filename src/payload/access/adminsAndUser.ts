import type { PayloadRequest } from "payload";

import { checkRole } from "./checkRole";

// For collection-level access (boolean only)
export const adminsAndUserBoolean = ({
  req: { user },
}: {
  req: PayloadRequest;
}): boolean => {
  if (user) {
    return checkRole(["admin", "user"], user);
  }
  return false;
};

// For document-level access (with query constraint)
export const adminsAndUser = ({ req: { user } }: { req: PayloadRequest }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }
    if (checkRole(["user"], user)) {
      return { id: { equals: user.id } };
    }
  }
  return false;
};
