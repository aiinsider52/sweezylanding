"use client";

import { useState } from "react";
import type { Locale } from "../../../lib/i18n";
import type { CartLine } from "../../../lib/shop-checkout";
import { CHECKOUT_COPY } from "../../../data/shop-checkout-copy";
import styles from "../../[locale]/shop/shop.module.css";

export function CheckoutButton({ items, locale, label, className }: { items: CartLine[]; locale: Locale; label: string; className?: string }) {
  const c = CHECKOUT_COPY[locale];
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");
  async function start() {
    setState("busy");
    try {
      const response = await fetch("/api/shop/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, locale }) });
      const data = (await response.json()) as { url?: string };
      if (!response.ok || !data.url) throw new Error("checkout");
      window.location.assign(data.url);
    } catch {
      setState("failed");
    }
  }
  return <>
    <button type="button" className={className ?? styles.primary} onClick={start} disabled={state === "busy" || !items.length} aria-busy={state === "busy"}>
      {state === "busy" ? c.busy : label}<span aria-hidden="true">→</span>
    </button>
    {state === "failed" ? <p className={styles.finePrint} role="alert">{c.failed}</p> : null}
  </>;
}
