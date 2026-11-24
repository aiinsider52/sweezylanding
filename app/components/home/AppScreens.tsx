import Image from "next/image";
import type { Locale } from "../../../lib/i18n";
import { APP_STORE_URL } from "../../../lib/links";
import styles from "./AppScreens.module.css";

type Screen = { file: string; tag: string; title: string; body: string };

// Current App Store screenshots (Illustrated City design). The app UI itself is Ukrainian-first.
const SCREENS: Record<Locale, { screens: Screen[]; cta: string; note: string; alt: string }> = {
  en: {
    cta: "Get Sweezy — free on iPhone", note: "Free download · interface in Ukrainian, English and German", alt: "Sweezy app screen",
    screens: [
      { file: "1-home", tag: "01 · Plan", title: "Your path in a new country", body: "A step-by-step plan for life in Switzerland, Germany and Austria." },
      { file: "2-map", tag: "02 · Map", title: "Everything on one map", body: "Offices, doctors and verified places, with routes." },
      { file: "3-jobs", tag: "03 · Work", title: "Jobs without chaos", body: "Fresh vacancies nearby and tips on how to apply." },
      { file: "4-market", tag: "04 · Market", title: "Services in your language", body: "Salons, lawyers and translators in your canton." },
      { file: "5-people", tag: "05 · People", title: "Your people nearby", body: "Friends with shared interests, events and chat." },
    ],
  },
  de: {
    cta: "Sweezy laden — kostenlos fürs iPhone", note: "Kostenloser Download · Oberfläche auf Ukrainisch, Englisch und Deutsch", alt: "Sweezy App-Bildschirm",
    screens: [
      { file: "1-home", tag: "01 · Plan", title: "Dein Weg im neuen Land", body: "Ein Schritt-für-Schritt-Plan für die Schweiz, Deutschland und Österreich." },
      { file: "2-map", tag: "02 · Karte", title: "Alles auf einer Karte", body: "Ämter, Ärzte und geprüfte Orte, mit Route." },
      { file: "3-jobs", tag: "03 · Arbeit", title: "Jobs ohne Chaos", body: "Aktuelle Stellen in der Nähe und Tipps zur Bewerbung." },
      { file: "4-market", tag: "04 · Markt", title: "Services in deiner Sprache", body: "Salons, Anwälte und Übersetzer in deinem Kanton." },
      { file: "5-people", tag: "05 · Leute", title: "Deine Leute in der Nähe", body: "Freunde mit gleichen Interessen, Events und Chat." },
    ],
  },
  uk: {
    cta: "Завантажити Sweezy — безкоштовно", note: "Безкоштовно для iPhone · українською, англійською та німецькою", alt: "Екран застосунку Sweezy",
    screens: [
      { file: "1-home", tag: "01 · План", title: "Твій шлях у новій країні", body: "Покроковий план для життя у Швейцарії, Німеччині та Австрії." },
      { file: "2-map", tag: "02 · Карта", title: "Усе важливе на одній карті", body: "Установи, лікарі й перевірені місця для українців." },
      { file: "3-jobs", tag: "03 · Робота", title: "Робота без хаосу", body: "Свіжі вакансії поруч і підказки, як податися." },
      { file: "4-market", tag: "04 · Маркет", title: "Сервіси українською", body: "Салони, юристи, перекладачі у твоєму кантоні." },
      { file: "5-people", tag: "05 · Люди", title: "Свої люди поруч", body: "Друзі за інтересами, події та чат." },
    ],
  },
};

export function AppScreens({ locale }: { locale: Locale }) {
  const c = SCREENS[locale];
  return <div className={styles.wrap}>
    <ul className={styles.strip}>
      {c.screens.map((screen) => <li key={screen.file} className={styles.card}>
        <div className={styles.shot}><Image src={`/app-screens/appstore-${screen.file}.webp`} alt={`${c.alt}: ${screen.title}`} fill sizes="(max-width: 900px) 62vw, 19vw" /></div>
        <div className={styles.meta}><span>{screen.tag}</span><strong>{screen.title}</strong><p>{screen.body}</p></div>
      </li>)}
    </ul>
    <div className={styles.footer}>
      <a className={styles.cta} href={APP_STORE_URL} target="_blank" rel="noopener" data-cta="app-store-screens">{c.cta}<i aria-hidden="true">↗</i></a>
      <span className={styles.note}>{c.note}</span>
    </div>
  </div>;
}
