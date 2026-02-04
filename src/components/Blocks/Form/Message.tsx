import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import type React from "react";
import RichText from "@/components/RichText";
import { FormGroup } from "./FormGroup";

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({
  message,
}) => {
  return (
    <FormGroup className="my-12" width="100">
      {message && <RichText data={message} />}
    </FormGroup>
  );
};
