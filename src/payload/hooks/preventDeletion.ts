import config from "@payload-config";
import { APIError, getPayload, type JsonObject } from "payload";

type CollectionPreventDeletionHook = {
  id?: string | number;
  slug?: string;
  protectedSlugs: string[];
  data?: JsonObject;
};

export const preventDeletion = async ({
  id,
  slug,
  protectedSlugs,
  data,
}: CollectionPreventDeletionHook) => {
  let isProtected = false;
  if (id) {
    // if we have an id, we can check the slug of the page being edited to see if it's protected
    const payload = await getPayload({ config });
    const page = await payload.findByID({
      collection: "pages",
      id,
    });
    isProtected = page && protectedSlugs.includes(page.slug);
  } else if (slug && data?.deletedAt) {
    // trash doesn't provide the id in the beforeDelete hook, so we check by slug instead
    isProtected = protectedSlugs.includes(slug || "");
  }
  if (isProtected) {
    throw new APIError("This page cannot be deleted.");
  }
};
