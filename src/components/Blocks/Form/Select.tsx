import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type { Control, FieldErrorsImpl } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { FormError } from "./FormError";
import { FormGroup } from "./FormGroup";

export const Select: React.FC<
  SelectField & {
    control: Control;
    errors: Partial<FieldErrorsImpl>;
  }
> = ({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
  defaultValue,
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
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t) => t.value === value);

          return (
            <SelectComponent
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectComponent>
          );
        }}
        rules={{ required }}
      />
      {errors[name] && <FormError name={name} />}
    </FormGroup>
  );
};
