import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Checkbox as CheckboxUi } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

import { FormError } from "./FormError";
import { FormGroup } from "./FormGroup";

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    id: string;
  }
> = ({ id, name, defaultValue, label, register, required, width }) => {
  const props = register(name, { required: required });
  const { setValue } = useFormContext();

  return (
    <FormGroup width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={id}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked);
          }}
        />
        <Label htmlFor={id}>
          {required && (
            <span className="required">
              * <span className="sr-only">(required)</span>
            </span>
          )}
          {label}
        </Label>
      </div>
      <FormError id={id} />
    </FormGroup>
  );
};
