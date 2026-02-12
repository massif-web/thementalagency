import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { TFunction } from "@payloadcms/translations";
import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { hero } from "@/payload/fields/hero";
import { populatePublishedAt, preventDeletion } from "@/payload/hooks";
import {
  revalidateDelete,
  revalidatePage,
} from "@/payload/hooks/revalidatePage";
import { slugField } from "@/payload/utilities/slugField";
import type { CustomTranslationsKeys } from "@/translations";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

const protectedSlugs = ["home", "impressum", "datenschutz"];

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  labels: {
    singular: {
      en: "Page",
      de: "Seite",
    },
    plural: {
      en: "Pages",
      de: "Seiten",
    },
  },
  trash: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
    hero: true,
    layout: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: ({ t: defaultT }) => {
        const t = defaultT as TFunction<CustomTranslationsKeys>;
        return t("general:title");
      },
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
          admin: {
            condition: (data) => data?.slug === "home",
          },
        },
        {
          admin: {
            condition: (data) => data?.slug !== "home",
          },
          fields: [
            {
              name: "layout",
              type: "blocks",
              label: "Blöcke",
              blockReferences: [
                "callToActionBlock",
                "contentBlock",
                "mediaBlock",
                "archiveBlock",
                "formBlock",
              ],
              blocks: [],
              // required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Inhalt",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [
      populatePublishedAt,
      async ({ originalDoc, req }) =>
        preventDeletion({
          slug: originalDoc?.slug,
          protectedSlugs,
          data: req.data,
        }),
    ],
    beforeDelete: [
      async ({ id, req }) =>
        preventDeletion({
          id,
          protectedSlugs,
          data: req.data,
        }),
    ],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
