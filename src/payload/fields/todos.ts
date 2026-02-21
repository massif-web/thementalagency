import type { Field } from "payload";

export const todoField: Field = {
  name: "todos",
  type: "textarea",
  label: "Kurz & Knapp Sätze",
  admin: {
    description:
      "Sätze die rechts vom Titel mit Häkchen angezeigt werden. Ein Satz pro Zeile.",
    condition: (data, _siblingData, { blockData }) => {
      // check if there is a blockType of `aboutBlock` in the layout field
      const layout = data?.layout;
      if (layout && Array.isArray(layout)) {
        const hasAboutBlock = layout.some(
          (block) => block.blockType === "aboutBlock",
        );
        if (hasAboutBlock) {
          return blockData?.blockType !== "titleBlock";
        }
      }
      return true;
    },
  },
};
