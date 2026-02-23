import type { CountryField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type { Control, FieldErrorsImpl } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { countryOptions } from "@/data/countries";
import { FormError } from "./FormError";
import { FormGroup } from "./FormGroup";

export const CountrySelect: React.FC<
  CountryField & {
    control: Control;
    errors: Partial<FieldErrorsImpl>;
    id: string;
  }
> = ({ id, name, control, label, required, width }) => {
  return (
    <FormGroup width={width}>
      <Label className="" htmlFor={id}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = countryOptions.find((t) => t.value === value);

          return (
            <Select
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={id}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
        rules={{ required }}
      />
      <FormError id={id} />
    </FormGroup>
  );
};
