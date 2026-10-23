"use client";

import { LegalPageShell } from "../components/LegalPageShell";
import { useLocale } from "../../lib/locale-context";

export default function CookiesPage() {
  const { t, locale } = useLocale();

  return (
    <LegalPageShell
      document="cookies"
      label={t("cookiesPage.label")}
      title={t("cookiesPage.title")}
      lastUpdated={locale === "uk" ? "Останнє оновлення: 23 жовтня 2026" : locale === "de" ? "Zuletzt aktualisiert: 23. Oktober 2026" : "Last updated: October 23, 2026"}
    >
      <section><p>{t("cookiesPage.intro")}</p></section>
      <section><h2>{locale === "uk" ? "Вибір аналітики" : locale === "de" ? "Analyse-Auswahl" : "Analytics choice"}</h2><p>{locale === "uk" ? "Аналітика вимкнена до згоди. Вибір зберігається в localStorage до 180 днів; випадкова аналітична сесія — в sessionStorage цієї вкладки. Змінити вибір можна через налаштування аналітики внизу ліворуч. Відмова не обмежує функції сайту." : locale === "de" ? "Die Analyse bleibt bis zur Zustimmung ausgeschaltet. Die Auswahl wird bis zu 180 Tage im localStorage gespeichert; die zufällige Analyse-Sitzung im sessionStorage dieses Tabs. Ändern können Sie die Auswahl über die Analyse-Einstellungen unten links. Bei Ablehnung bleiben alle Funktionen verfügbar." : "Analytics stays off until you agree. The choice is stored in localStorage for up to 180 days; a random analytics session uses this tab’s sessionStorage. Change your choice using Analytics settings at the bottom left. Declining keeps every feature available."}</p></section>
      <section><h2>{t("cookiesPage.s1Title")}</h2><p>{t("cookiesPage.s1Text")}</p></section>
      <section>
        <h2>{t("cookiesPage.s2Title")}</h2>
        <p>{t("cookiesPage.s2Intro")}</p>
        <ul>
          <li>{t("cookiesPage.s2Item1")}</li>
          <li>{t("cookiesPage.s2Item2")}</li>
          <li>{t("cookiesPage.s2Item3")}</li>
        </ul>
      </section>
      <section>
        <h2>{t("cookiesPage.s3Title")}</h2>
        <ul>
          <li><strong>{t("cookiesPage.s3Item1Label")}</strong> {t("cookiesPage.s3Item1Text")}</li>
          <li><strong>{t("cookiesPage.s3Item2Label")}</strong> {t("cookiesPage.s3Item2Text")}</li>
          <li><strong>{t("cookiesPage.s3Item3Label")}</strong> {t("cookiesPage.s3Item3Text")}</li>
        </ul>
      </section>
      <section><h2>{t("cookiesPage.s4Title")}</h2><p>{t("cookiesPage.s4Text")}</p></section>
      <section>
        <h2>{t("cookiesPage.s5Title")}</h2>
        <p>{t("cookiesPage.s5Text")} <a href={`mailto:${t("cookiesPage.email")}`}>{t("cookiesPage.email")}</a>.</p>
      </section>
    </LegalPageShell>
  );
}
