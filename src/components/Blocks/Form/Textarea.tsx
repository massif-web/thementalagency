import type { TextField } from "@payloadcms/plugin-form-builder/types";
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
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
}) => {
  return (
    <FormGroup width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: required })}
      />

      {errors[name] && <FormError name={name} />}
    </FormGroup>
  );
};
