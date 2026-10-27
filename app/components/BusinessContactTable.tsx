import type { Locale } from "../../lib/i18n";
import { businessContacts, BUSINESS_CONTACTS_CHECKED_AT } from "../../data/business-contacts";
import styles from "./reference-table.module.css";

const COPY = {
  uk: { title: "З яким питанням і до якої установи", intro: "Візьміть документ про перебування й точний опис послуг. Ця таблиця допоможе адресувати запит відповідальній установі.", question: "Ваше питання", office: "Куди звертатися", answer: "Що з’ясувати", source: "Першоджерело", checked: "Джерела таблиці перевірено", scope: "Перелік допомагає зорієнтуватися; рішення у вашій справі приймає відповідальна установа." },
  en: { title: "Which question goes to which authority?", intro: "Bring your residence document and a precise description of your services. Use this table to address your question to the responsible authority.", question: "Your question", office: "Where to ask", answer: "What to clarify", source: "Primary source", checked: "Table sources checked", scope: "This is a starting point; the responsible authority decides your individual case." },
  de: { title: "Mit welcher Frage zu welcher Stelle?", intro: "Nehmen Sie Ihr Aufenthaltsdokument und eine genaue Beschreibung Ihrer Leistungen mit. Die Tabelle hilft, Fragen an die zuständige Stelle zu richten.", question: "Ihre Frage", office: "Zuständige Stelle", answer: "Was zu klären ist", source: "Originalquelle", checked: "Tabellenquellen geprüft", scope: "Die Übersicht dient der Orientierung; die zuständige Stelle entscheidet über Ihren Einzelfall." },
};

export function BusinessContactTable({ locale, country }: { locale: Locale; country: "germany" | "austria" }) {
  const c = COPY[locale];
  return <section className={styles.section} id="business-contacts" aria-labelledby="business-contacts-title">
    <h2 id="business-contacts-title">{c.title}</h2><p>{c.intro}</p>
    <div className={styles.scroll} role="region" aria-labelledby="business-contacts-title" tabIndex={0}>
      <table><caption>{c.checked}: <time dateTime={BUSINESS_CONTACTS_CHECKED_AT}>{BUSINESS_CONTACTS_CHECKED_AT.split("-").reverse().join(".")}</time></caption>
        <thead><tr><th scope="col">{c.question}</th><th scope="col">{c.office}</th><th scope="col">{c.answer}</th><th scope="col">{c.source}</th></tr></thead>
        <tbody>{businessContacts[country].map((row, index) => <tr key={row.source.url} id={`business-contact-${index + 1}`}><th scope="row">{row.question[locale]}</th><td>{row.office[locale]}</td><td>{row.answer[locale]}</td><td><a href={row.source.url} target="_blank" rel="noreferrer noopener">{row.source.name} ↗</a></td></tr>)}</tbody>
      </table>
    </div><p className={styles.note}>{c.scope}</p>
  </section>;
}
