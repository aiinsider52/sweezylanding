"use client";

import { Minus, Plus } from "@phosphor-icons/react";
import { useId, useState } from "react";
import type { LandingCopy } from "../../../lib/landing-copy";
import styles from "./landing.module.css";

export function LandingFaq({ items }: { items: LandingCopy["faq"]["items"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className={styles.faqItem}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                {isOpen ? <Minus size={22} weight="bold" aria-hidden /> : <Plus size={22} weight="bold" aria-hidden />}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
