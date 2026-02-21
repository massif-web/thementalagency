"use client";

import { useFormState } from "react-hook-form";

export const FormError = ({ id }: { id: string }) => {
  const { errors } = useFormState();

  const error = errors[id]?.message as string | undefined;
  if (!error) {
    return null;
  }
  return (
    <div className="mt-2 form-alert error">
      {error || "This field is required"}
    </div>
  );
};
