import type { EmailField } from "@payloadcms/plugin-form-builder/types";
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

export const Email: React.FC<
  EmailField & {
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
        type="email"
        {...register(id, {
          pattern: /^\S[^\s@]*@\S+$/,
          required: required ? message || "Bitte ausfüllen" : false,
        })}
      />

      <FormError id={id} />
    </FormGroup>
  );
};
