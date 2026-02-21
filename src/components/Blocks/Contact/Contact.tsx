"use client";
import { ContactForm } from "@/components/Blocks/Contact/ContactForm";
import { Button } from "@/components/ui/Button";
import type { ContactBlock as BlockProps } from "@/payload-types";
import { useUiStore } from "@/store/ui-store";

type Props = {
  buttonLabel?: string | null | undefined;
  formGroup?: BlockProps["formGroup"];
  children?: React.ReactNode;
};

export const Contact: React.FC<Props> = ({
  formGroup,
  buttonLabel,
  children,
}) => {
  const openContact = useUiStore((s) => s.openContact);
  const open = useUiStore((s) => s.contactOpen);
  return (
    <>
      {open ? (
        <ContactForm {...formGroup} />
      ) : (
        <>
          {children}
          {buttonLabel && (
            <div className="flex justify-center gap-4 clamp-[mt,8,12]">
              <Button
                variant={"primary"}
                size={"primary"}
                onClick={openContact}
              >
                <span>
                  <span>{buttonLabel}</span>
                </span>
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
