"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { ConvertToBrs } from "@/components/ConvertToBrs";

export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {question}
        <span>
          <Plus
            strokeWidth={3}
            className={`icon ${isOpen ? "rotate-45" : ""}`}
          />
        </span>
      </button>
      <section
        className={`answer ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="answer-wrap">
            <div>
              <p>
                <ConvertToBrs string={answer} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
