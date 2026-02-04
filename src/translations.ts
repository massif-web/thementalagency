import type { NestedKeysStripped } from "@payloadcms/translations";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";

export const customTranslations = {
  en: {
    ...en,
    general: {
      title: "Title",
      slug: "Slug",
      description: "Description",
      image: "Image",
      fields: "Fields",
    },
    "plugin-redirects": {
      labels: {
        singular: "Redirect",
        plural: "Redirects",
      },
      fields: {
        description:
          "You will need to rebuild the website when changing this field.",
      },
    },
    formBuilderPlugin: {
      form: {
        labels: {
          singular: "Form",
          plural: "Forms",
        },
      },
      formSubmissions: {
        labels: {
          singular: "Form Submission",
          plural: "Form Submissions",
        },
      },
    },
    searchPlugin: {
      description:
        "This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.",
      labels: {
        singular: "Search",
        plural: "Searches",
      },
    },
  },
  de: {
    ...de,
    general: {
      title: "Titel",
      slug: "Pfad",
      description: "Beschreibung",
      image: "Bild",
      fields: "Felder",
      trash: "Papierkorb",
    },
    "plugin-redirects": {
      customUrl: "Benutzerdefinierte URL",
      documentToRedirect: "Dokument zum Weiterleiten",
      fromUrl: "Von URL",
      internalLink: "Interner Link",
      redirectType: "Weiterleitungstyp",
      toUrlType: "Zu URL Typ",
      labels: {
        singular: "Weiterleitung",
        plural: "Weiterleitungen",
      },
      fields: {
        description:
          "Sie müssen die Website neu kompilieren, wenn Sie dieses Feld ändern.",
      },
    },
    formBuilderPlugin: {
      form: {
        labels: {
          singular: "Formular",
          plural: "Formulare",
        },
      },
      formSubmissions: {
        labels: {
          singular: "Formularübermittlung",
          plural: "Formularübermittlungen",
        },
      },
    },

    searchPlugin: {
      description:
        "Dies ist eine Sammlung automatisch erstellter Suchergebnisse. Diese Ergebnisse werden von der globalen Suche der Website verwendet und automatisch aktualisiert, wenn Dokumente im CMS erstellt oder aktualisiert werden.",
      labels: {
        singular: "Suche",
        plural: "Suchanfragen",
      },
    },
  },
};

export type CustomTranslationsObject = typeof customTranslations;
export type CustomTranslationsKeys =
  NestedKeysStripped<CustomTranslationsObject>;
