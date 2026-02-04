import slugify from "@sindresorhus/slugify";
import type { RowField } from "payload";
import { slugField as slugFieldImpl } from "payload";

type SlugFieldArgs = Parameters<typeof slugFieldImpl>[0];

export const slugField = (args?: SlugFieldArgs): RowField =>
  slugFieldImpl({
    ...args,
    slugify: ({ valueToSlugify }) =>
      valueToSlugify ? slugify(valueToSlugify) : "",
  });
