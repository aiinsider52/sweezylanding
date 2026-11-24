import type { Locale } from "../lib/i18n";

// Plain module so both server pages and client buttons can read it.
export const CHECKOUT_COPY: Record<Locale, { buy: string; checkout: string; busy: string; failed: string; secure: string; onlineNote: string; unpricedNote: string }> = {
  en: { buy: "Buy now", checkout: "Checkout", busy: "Opening secure checkout…", failed: "Checkout is unavailable right now. Please use the enquiry button.", secure: "Secure payment by Stripe · card, Apple Pay, Google Pay, TWINT where available", onlineNote: "Pay online now; we confirm dispatch by email.", unpricedNote: "Items without a price stay in your enquiry." },
  de: { buy: "Jetzt kaufen", checkout: "Zur Kasse", busy: "Sichere Kasse wird geöffnet…", failed: "Die Kasse ist gerade nicht verfügbar. Bitte nutze die Anfrage.", secure: "Sichere Zahlung über Stripe · Karte, Apple Pay, Google Pay, TWINT wo verfügbar", onlineNote: "Jetzt online bezahlen; den Versand bestätigen wir per E-Mail.", unpricedNote: "Artikel ohne Preis bleiben in deiner Anfrage." },
  uk: { buy: "Купити зараз", checkout: "Оформити замовлення", busy: "Відкриваємо захищену оплату…", failed: "Оплата зараз недоступна. Скористайтеся кнопкою запиту.", secure: "Захищена оплата через Stripe · картка, Apple Pay, Google Pay, TWINT, де доступно", onlineNote: "Оплатіть онлайн; відправлення підтвердимо електронною поштою.", unpricedNote: "Товари без ціни залишаються в запиті." },
};
