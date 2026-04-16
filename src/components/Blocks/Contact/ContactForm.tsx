"use client";
import type { FormFieldBlock } from "@payloadcms/plugin-form-builder/types";
import { X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fields } from "@/components/Blocks/Form/fields";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import type { ContactBlock as BlockProps } from "@/payload-types";
import { useUiStore } from "@/store/ui-store";
import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";

export const confirmBeforeClosing = (form: HTMLFormElement) => {
  // confirm before closing if form has been interacted with
  const formElements = form.querySelectorAll(
    "input, textarea, select",
  ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  const isFormInteractedWith = Array.from(formElements).some(
    (el) => el.value !== "",
  );
  if (isFormInteractedWith) {
    const confirmClose = window.confirm(
      "Möchten Sie das Formular wirklich schliessen? Ihre Eingaben gehen verloren.",
    );
    if (!confirmClose) {
      return false;
    }
  }
  return true;
};

const PersonalFieldsStep = [
  {
    title: "Personalien",
    id: "personal-fields",
    fieldsets: [
      {
        id: "fld-name",
        label: "Name",
        name: "fld-name",
        description: "",
        required: true,
        defaultValue: "",
        blockType: "text",
        message: "Bitte ausfüllen",
      },
      {
        id: "fld-email",
        label: "E-Mail",
        name: "fld-email",
        description: "",
        required: true,
        defaultValue: "",
        blockType: "email",
        message: "Bitte ausfüllen",
      },
    ],
  },
];

export const ContactForm: React.FC<BlockProps["formGroup"]> = (props) => {
  const { title, description, successMessage, step } = props || {};
  const [className, setClassName] = useState(
    "animate-in duration-500 ease-spring-2 fade-in zoom-in",
  );
  const formId = "69949ee31f0632131919d09f";
  const formRef = useRef<HTMLFormElement | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const steps = [...(step || []), ...PersonalFieldsStep];
  const numSteps = steps?.length || 0;
  const closeContact = useUiStore((s) => s.closeContact);
  const open = useUiStore((s) => s.contactOpen);

  const handleClose = () => {
    if (formRef.current && !confirmBeforeClosing(formRef.current)) {
      return;
    }
    requestAnimationFrame(() => {
      setClassName("animate-out duration-300 fade-out zoom-out");
      setTimeout(() => {
        closeContact();
      }, 300);
    });
  };

  useEscapeKey(handleClose, open);
  useClickOutside(formRef, handleClose, open);

  return (
    <div
      className={cn(
        "z-10 relative bg-body border-2 border-accent/30 rounded-lg w-full lg:min-w-200 clamp-[p,5,8]",
        className,
      )}
      id="contact-form"
    >
      <button
        type="button"
        className="top-0 lg:top-4 right-0 lg:right-4 absolute text-accent cursor-pointer"
        onClick={handleClose}
      >
        <X />
      </button>
      {(title || description) && !hasSubmitted && (
        <div className="mb-6">
          {title && (
            <h3 className="text-accent">
              {title} {currentStep}/{numSteps}
            </h3>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-prose text-base text-balance">
              {description}
            </p>
          )}
        </div>
      )}
      <Form
        ref={formRef}
        id={formId}
        steps={steps}
        currentStep={currentStep}
        numSteps={numSteps}
        setCurrentStep={setCurrentStep}
        hasSubmitted={hasSubmitted}
        setHasSubmitted={setHasSubmitted}
        successMessage={successMessage}
      />
    </div>
  );
};

type FormField = {
  id?: string | null | undefined;
  stepIndex?: number;
  label?: string | null | undefined;
  name?: string;
  description?: string | null | undefined;
  required?: boolean;
  defaultValue?: string;
  blockType?: string;
  message?: string;
};

type FormElements = FormField[];

type FormProps = {
  id: string;
  ref: React.Ref<HTMLFormElement>;
  steps: NonNullable<BlockProps["formGroup"]>["step"];
  numSteps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  hasSubmitted: boolean | undefined;
  setHasSubmitted: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  successMessage?: string | null | undefined;
};

const Form: React.FC<FormProps> = ({
  id,
  ref,
  steps,
  numSteps,
  currentStep,
  setCurrentStep,
  hasSubmitted,
  setHasSubmitted,
  successMessage,
}) => {
  const data =
    steps?.reduce((acc, step, stepIndex) => {
      const { fieldsets } = step;
      fieldsets?.forEach((field: FormField, fieldIndex) => {
        const key = `fld-${field.id || `name-${stepIndex}_field${fieldIndex}`}`;
        const name = field?.label
          ? field?.label.toLowerCase().replace(/\s+/g, "_")
          : key;
        const blockType = field?.blockType || "textarea";
        acc.push({
          id: key,
          stepIndex,
          label: field.label || key,
          name: name,
          description: field.description || "",
          defaultValue: "",
          required: true,
          blockType: blockType,
          message: "Bitte ausfüllen",
        });
      });
      return acc;
    }, [] as FormElements) || [];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();

  const defaultValues = Object.fromEntries(
    data.map((f) => [f.id, f.defaultValue ?? ""]),
  );

  const getStepFieldNames = (stepIndex: number) =>
    data.filter((d) => d.stepIndex === stepIndex).map((d) => d.id || "");

  const formMethods = useForm({
    defaultValues,
    mode: "all",
    // reValidateMode: "onChange",
    // shouldUnregister: true,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = formMethods;

  const onSubmit = (submittedData: FormFieldBlock[]) => {
    let loadingTimerID: ReturnType<typeof setTimeout>;
    const submitForm = async () => {
      setError(undefined);

      const dataToSend = Object.entries(submittedData).map(
        ([label, value]) => ({
          field: data.find((d) => d.id === label)?.label || label,
          value,
        }),
      );

      // delay loading indicator by 1s
      loadingTimerID = setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: id,
            submissionData: dataToSend,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const res = await req.json();

        clearTimeout(loadingTimerID);

        if (req.status >= 400) {
          setIsLoading(false);

          setError({
            message: res.errors?.[0]?.message || "Internal Server Error",
            status: res.status,
          });

          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);
      } catch (err) {
        console.warn(err);
        setIsLoading(false);
        setError({
          message: "Something went wrong.",
        });
      }
    };

    void submitForm();
  };

  return (
    <FormProvider {...formMethods}>
      {!isLoading && hasSubmitted && successMessage && successMessage}
      {isLoading && !hasSubmitted && (
        <p>Nachricht wird empfangen, bitte warten...</p>
      )}
      {error && (
        <div className="form-alert error">{`${error.status || "500"}: ${error.message || ""}`}</div>
      )}
      {(isLoading && !hasSubmitted) ||
        (!isLoading && !hasSubmitted && (
          <form id={id} ref={ref} onSubmit={handleSubmit(onSubmit)}>
            {steps?.map((step, index) => {
              const key = `step-${step?.id}-${index}`;
              const stepData = data.filter((d) => d.stepIndex === index);
              return (
                <div
                  className={cn(
                    "text-left",
                    currentStep === index + 1 ? "block" : "hidden",
                  )}
                  key={key}
                >
                  {step?.title && <h4 className="h4">{step.title}</h4>}
                  <div className="space-y-8 mt-4">
                    {stepData.map((field) => {
                      const blockType = field.blockType || "text";
                      // biome-ignore lint: unnecessary
                      const Field: React.FC<any> =
                        fields?.[blockType as keyof typeof fields];
                      return (
                        <div className={cn("")} key={field.id}>
                          <Field
                            {...field}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end mt-8">
              {currentStep > 1 && (
                <PrimaryButton
                  form={id}
                  type="button"
                  className="mr-auto"
                  onClick={() => setCurrentStep((current) => current - 1)}
                >
                  Zurück
                </PrimaryButton>
              )}
              {currentStep < numSteps && (
                <PrimaryButton
                  form={id}
                  type="button"
                  className="ml-auto"
                  onClick={async () => {
                    const stepIndex = currentStep - 1;
                    const names = getStepFieldNames(stepIndex);

                    const ok = await trigger(names, {
                      shouldFocus: true,
                    });
                    if (!ok) return;

                    setCurrentStep((c) => c + 1);
                  }}
                >
                  Weiter
                </PrimaryButton>
              )}
              {currentStep === numSteps && (
                <PrimaryButton form={id} type="submit" className="ml-auto">
                  Senden
                </PrimaryButton>
              )}
            </div>
          </form>
        ))}
    </FormProvider>
  );
};
