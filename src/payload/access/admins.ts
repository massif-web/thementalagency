import type { PayloadRequest } from "payload";

import { checkRole } from "./checkRole";

export const admins = ({ req: { user } }: { req: PayloadRequest }) =>
  checkRole(["admin"], user);
