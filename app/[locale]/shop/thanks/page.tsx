import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "../../../../lib/blog";
import { ClearSelection } from "../../../components/shop/ClearSelection";
import styles from "../shop.module.css";

const COPY = {
  en: { title: "Thank you — your order is in.", body: "Stripe has sent your receipt by email. We prepare your Swiss pieces and confirm dispatch by email. Questions: support@sweezy.world.", back: "Back to the shop", app: "Meanwhile, plan your next step" },
  de: { title: "Danke — deine Bestellung ist eingegangen.", body: "Stripe hat dir die Quittung per E-Mail geschickt. Wir bereiten deine Stücke vor und bestätigen den Versand per E-Mail. Fragen: support@sweezy.world.", back: "Zurück zum Shop", app: "Plane inzwischen deinen nächsten Schritt" },
  uk: { title: "Дякуємо — замовлення отримано.", body: "Stripe надіслав квитанцію на вашу пошту. Ми підготуємо товари й підтвердимо відправлення листом. Питання: support@sweezy.world.", back: "Повернутися до магазину", app: "А поки сплануйте наступний крок" },
} as const;

export const metadata: Metadata = { title: "Sweezy Shop", robots: { index: false, follow: false } };
export function generateStaticParams() { return ["uk", "en", "de"].map(locale => ({ locale })); }

export default function ThanksPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const c = COPY[params.locale];
  return <main className={styles.page}>
    <ClearSelection />
    <section className={styles.process} aria-labelledby="thanks-title" style={{ minHeight: "60vh", display: "grid", alignContent: "center" }}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>SWEEZY SHOP</p><h1 id="thanks-title">{c.title}</h1><p>{c.body}</p></div></div>
      <div className={styles.actions}><Link className={styles.primary} href={`/${params.locale}/shop`}>{c.back}<span aria-hidden="true">↗</span></Link><Link className={styles.textButton} href={`/${params.locale}/starter-kit`}>{c.app}</Link></div>
    </section>
  </main>;
}
