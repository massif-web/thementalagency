import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Plugin } from "payload";
import { deepMergeWithCombinedArrays } from "payload";
import { searchFields } from "@/payload/fields/searchFields";
import { beforeSyncWithSearch } from "@/payload/hooks/beforeSync";
import { revalidateRedirects } from "@/payload/hooks/revalidateRedirects";
import type { Page, Post } from "@/payload-types";
import { admins } from "./payload/access/admins";
import { generatePageURL } from "./payload/utilities/generatePageURL";
import { customTranslations as i18n } from "./translations";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | ${process.env.NEXT_APP_NAME}`
    : process.env.NEXT_APP_NAME || "Payload Website Template";
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) =>
  generatePageURL({ path: doc?.slug || null, preview: false }) || "";

const generalTranslation = {
  name: "title",
  label: {
    en: i18n.en.general.title,
    de: i18n.de.general.title,
  },
};

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ["pages", "posts"],
    overrides: {
      access: {
        admin: admins,
      },
      labels: {
        singular: {
          en: i18n.en["plugin-redirects"].labels.singular,
          de: i18n.de["plugin-redirects"].labels.singular,
        },
        plural: {
          en: i18n.en["plugin-redirects"].labels.plural,
          de: i18n.de["plugin-redirects"].labels.plural,
        },
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "from") {
            return {
              ...field,
              admin: {
                description: i18n.en["plugin-redirects"].fields.description,
              },
            };
          }
          return field;
        });
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ["categories"],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      access: {
        admin: admins,
      },
      labels: {
        singular: {
          en: "Form",
          de: "Formular",
        },
        plural: {
          en: "Forms",
          de: "Formulare",
        },
      },
      fields: ({ defaultFields }) => {
        const overrides = deepMergeWithCombinedArrays(defaultFields, [
          generalTranslation,
        ]) as typeof defaultFields;

        return overrides.map((field) => {
          if ("name" in field && field.name === "confirmationMessage") {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                  ];
                },
              }),
            };
          }
          return field;
        });
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: {
          en: i18n.en.formBuilderPlugin.formSubmissions.labels.singular,
          de: i18n.de.formBuilderPlugin.formSubmissions.labels.singular,
        },
        plural: {
          en: i18n.en.formBuilderPlugin.formSubmissions.labels.plural,
          de: i18n.de.formBuilderPlugin.formSubmissions.labels.plural,
        },
      },
      fields: ({ defaultFields }) =>
        deepMergeWithCombinedArrays(defaultFields, [
          generalTranslation,
        ]) as typeof defaultFields,
    },
  }),
  searchPlugin({
    collections: ["posts"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      access: {
        admin: admins,
      },
      admin: {
        description: {
          en: i18n.en.searchPlugin.description,
          de: i18n.de.searchPlugin.description,
        },
      },
      labels: {
        singular: {
          en: i18n.en.searchPlugin.labels.singular,
          de: i18n.de.searchPlugin.labels.singular,
        },
        plural: {
          en: i18n.en.searchPlugin.labels.plural,
          de: i18n.de.searchPlugin.labels.plural,
        },
      },

      fields: ({ defaultFields }) => {
        const overrides = deepMergeWithCombinedArrays(defaultFields, [
          generalTranslation,
        ]) as typeof defaultFields;

        return [...overrides, ...searchFields];
      },
    },
  }),
];
