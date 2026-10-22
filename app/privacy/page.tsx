"use client";

import { LegalPageShell } from "../components/LegalPageShell";
import { useLocale } from "../../lib/locale-context";

const WEBSITE_METRICS = {
  en: { title: "Website measurements", text: "The website records page paths, timestamps, technical performance and errors in server logs. Referral measurements use the referring domain or a campaign source parameter to identify a possible AI referral. Service contact measurements record the provider identifier and the clicked action (phone, email, website or map). They do not collect message contents or confirm that a call, booking or purchase took place." },
  uk: { title: "Вимірювання на сайті", text: "Сайт записує в серверні журнали шлях сторінки, час події, технічні показники та помилки. Для визначення можливого переходу з ІІ використовуємо домен джерела або параметр кампанії. Для контактів із сервісами фіксуємо ідентифікатор виконавця й натиснуту дію: телефон, email, сайт або карта. Ці події не містять тексту повідомлень і не підтверджують дзвінок, запис чи купівлю." },
  de: { title: "Messungen auf der Website", text: "Die Website erfasst Seitenpfade, Zeitpunkte, technische Leistungsdaten und Fehler in Serverprotokollen. Verweise werden anhand der Herkunfts-Domain oder eines Kampagnenparameters einer möglichen KI-Quelle zugeordnet. Bei Kontaktlinks erfassen wir die Anbieterkennung und die angeklickte Aktion: Telefon, E-Mail, Website oder Karte. Diese Ereignisse enthalten keine Nachrichteninhalte und bestätigen keinen Anruf, keine Buchung und keinen Kauf." },
};

export default function PrivacyPolicy() {
  const { t, locale } = useLocale();
  const websiteMetrics = WEBSITE_METRICS[locale];

  return (
    <LegalPageShell
      document="privacy"
      label={t("privacyPage.label")}
      title={t("privacyPage.title")}
      lastUpdated={locale === "uk" ? "Останнє оновлення: 22 жовтня 2026" : locale === "de" ? "Zuletzt aktualisiert: 22. Oktober 2026" : "Last updated: October 22, 2026"}
    >
      <section><h2>{t("privacyPage.s1Title")}</h2><p>{t("privacyPage.s1Text")}</p></section>
      <section>
        <h2>{t("privacyPage.s2Title")}</h2>
        <h3>{t("privacyPage.s2aTitle")}</h3>
        <ul>
          <li><strong>{t("privacyPage.s2aItem1Label")}</strong> {t("privacyPage.s2aItem1Text")}</li>
          <li><strong>{t("privacyPage.s2aItem2Label")}</strong> {t("privacyPage.s2aItem2Text")}</li>
        </ul>
        <h3>{t("privacyPage.s2bTitle")}</h3>
        <ul>
          <li><strong>{t("privacyPage.s2bItem1Label")}</strong> {t("privacyPage.s2bItem1Text")}</li>
          <li><strong>{t("privacyPage.s2bItem2Label")}</strong> {t("privacyPage.s2bItem2Text")}</li>
          <li><strong>{t("privacyPage.s2bItem3Label")}</strong> {t("privacyPage.s2bItem3Text")}</li>
        </ul>
      </section>
      <section><h2>{websiteMetrics.title}</h2><p>{websiteMetrics.text}</p></section>
      <section>
        <h2>{t("privacyPage.s3Title")}</h2>
        <p>{t("privacyPage.s3Intro")}</p>
        <ul>
          <li>{t("privacyPage.s3Item1")}</li>
          <li>{t("privacyPage.s3Item2")}</li>
          <li>{t("privacyPage.s3Item3")}</li>
          <li>{t("privacyPage.s3Item4")}</li>
          <li>{t("privacyPage.s3Item5")}</li>
          <li>{t("privacyPage.s3Item6")}</li>
        </ul>
      </section>
      <section>
        <h2>{t("privacyPage.s4Title")}</h2>
        <p>{t("privacyPage.s4Intro")}</p>
        <ul>
          <li><strong>{t("privacyPage.s4Item1Label")}</strong> {t("privacyPage.s4Item1Text")}</li>
          <li><strong>{t("privacyPage.s4Item2Label")}</strong> {t("privacyPage.s4Item2Text")}</li>
          <li><strong>{t("privacyPage.s4Item3Label")}</strong> {t("privacyPage.s4Item3Text")}</li>
        </ul>
      </section>
      <section><h2>{t("privacyPage.s5Title")}</h2><p>{t("privacyPage.s5Text")}</p></section>
      <section>
        <h2>{t("privacyPage.s6Title")}</h2>
        <p>{t("privacyPage.s6Intro")}</p>
        <ul>
          <li><strong>{t("privacyPage.s6Item1Label")}</strong> {t("privacyPage.s6Item1Text")}</li>
          <li><strong>{t("privacyPage.s6Item2Label")}</strong> {t("privacyPage.s6Item2Text")}</li>
          <li><strong>{t("privacyPage.s6Item3Label")}</strong> {t("privacyPage.s6Item3Text")}</li>
          <li><strong>{t("privacyPage.s6Item4Label")}</strong> {t("privacyPage.s6Item4Text")}</li>
          <li><strong>{t("privacyPage.s6Item5Label")}</strong> {t("privacyPage.s6Item5Text")}</li>
        </ul>
        <p>{t("privacyPage.s6Outro")} <a href="mailto:support@sweezy.world">support@sweezy.world</a>.</p>
      </section>
      <section><h2>{t("privacyPage.s7Title")}</h2><p>{t("privacyPage.s7Text")}</p></section>
      <section><h2>{t("privacyPage.s8Title")}</h2><p>{t("privacyPage.s8Text")}</p></section>
      <section><h2>{t("privacyPage.s9Title")}</h2><p>{t("privacyPage.s9Text")}</p></section>
      <section><h2>{t("privacyPage.s10Title")}</h2><p>{t("privacyPage.s10Text")}</p></section>
      <section>
        <h2>{t("privacyPage.s11Title")}</h2>
        <p>{t("privacyPage.s11Intro")}</p>
        <div>
          <p><strong>{t("privacyPage.emailLabel")}</strong> <a href="mailto:support@sweezy.world">support@sweezy.world</a></p>
          <p><strong>{t("privacyPage.websiteLabel")}</strong> <a href="https://sweezy.world" target="_blank" rel="noreferrer">sweezy.world</a></p>
        </div>
      </section>
    </LegalPageShell>
  );
}
