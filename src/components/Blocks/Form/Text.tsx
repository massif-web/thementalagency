import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { FormError } from "./FormError";
import { FormGroup } from "./FormGroup";

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    id: string;
    message?: string;
  }
> = ({ id, message, defaultValue, label, register, required, width }) => {
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
      <Input
        defaultValue={defaultValue}
        id={id}
        type="text"
        {...register(id, {
          required: required ? message || "Bitte ausfüllen" : false,
        })}
      />
      <FormError id={id} />
    </FormGroup>
  );
};
