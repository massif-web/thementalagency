"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useUiStore } from "@/store/ui-store";

export const FooterContact = () => {
  const openContact = useUiStore((s) => s.openContact);
  const router = useRouter();
  const handleClick = async () => {
    if (window.location.pathname === "/") {
      const section = document.getElementById("kontakt");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    router.push("/#kontakt");

    setTimeout(() => {
      openContact();
    }, 300);
  };
  return (
    <PrimaryButton onClick={handleClick}>
      Kontakt
      <br />
      aufnehmen
    </PrimaryButton>
  );
};
