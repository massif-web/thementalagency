import type { TextField } from "@payloadcms/plugin-form-builder/types";
import { ShieldAlert } from "lucide-react";
import type React from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { Textarea as TextAreaComponent } from "@/components/ui/Textarea";

import { FormError } from "./FormError";
import { FormGroup } from "./FormGroup";

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    rows?: number;
    description?: string;
    id: string;
    message?: string;
  }
> = ({
  id,
  defaultValue,
  label,
  description,
  register,
  message,
  required,
  rows = 3,
  width,
}) => {
  return (
    <FormGroup width={width}>
      <Label htmlFor={id}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(Pflichtfeld)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={id}
        rows={rows}
        {...register(id, {
          required: required ? message || "Bitte ausfüllen" : false,
        })}
      />
      {description && (
        <p className="description">
          <ShieldAlert />
          <span>{description}</span>
        </p>
      )}

      <FormError id={id} />
    </FormGroup>
  );
};
