import type { Block } from "payload";

export const ContactBlock: Block = {
  slug: "contactBlock",
  labels: {
    singular: "Kontaktblock",
    plural: "Kontaktblöcke",
  },
  fields: [
    {
      name: "title",
      type: "textarea",
      label: "Titel",
      admin: {
        className: "media-block-title",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Text",
    },
    {
      name: "buttonLabel",
      type: "text",
      label: "Button-Text",
    },
    {
      name: "formGroup",
      type: "group",
      label: "Formular",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titel",
        },
        {
          name: "description",
          type: "textarea",
          label: "Beschreibung",
        },
        {
          name: "successMessage",
          type: "textarea",
          label: "Erfolgsmeldung",
        },
        {
          name: "step",
          type: "array",
          label: "Formularschritte",
          labels: {
            singular: "Formularschritt",
            plural: "Formularschritte",
          },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Titel",
            },
            {
              name: "fieldsets",
              type: "array",
              label: "Formularfelder",
              labels: {
                singular: "Formularfeld",
                plural: "Formularfelder",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Feldbezeichnung",
                },
                {
                  name: "description",
                  type: "text",
                  label: "Feldbeschreibung",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
