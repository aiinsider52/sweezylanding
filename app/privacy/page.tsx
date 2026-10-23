"use client";

import { LegalPageShell } from "../components/LegalPageShell";
import { useLocale } from "../../lib/locale-context";

const WEBSITE_METRICS = {
  en: { title: "Website measurements", text: "Optional usage measurements start only after you allow analytics. A random identifier in sessionStorage links page views, a source category, PDF requests, PDF receipt in your browser and onward app, community or provider clicks within that browser tab. These event records contain no IP addresses, full referrer URLs, query strings or message contents. Receiving a PDF does not prove it was saved; clicks do not confirm an install, call or booking. The consent choice is stored in localStorage for up to 180 days; local event files are retained for up to 90 days. Withdraw consent using Analytics settings at the bottom left: future usage events stop and the tab identifier is removed. Technical performance and error logs are separate. Hosting services can maintain their own access logs." },
  uk: { title: "Вимірювання на сайті", text: "Вимірювання використання починаються лише після згоди на аналітику. Випадковий ідентифікатор у sessionStorage пов’язує перегляди, категорію джерела, запити й отримання PDF браузером та переходи до застосунку, спільноти або виконавця в межах вкладки. У ці записи не додаються IP-адреси, повні URL джерел, параметри запитів або тексти повідомлень. Отримання PDF не підтверджує збереження; перехід не підтверджує встановлення, дзвінок чи запис. Вибір згоди зберігається в localStorage до 180 днів, локальні файли подій — до 90 днів. Згоду можна відкликати через налаштування аналітики внизу ліворуч: нові події припиняються, ідентифікатор вкладки видаляється. Технічні показники й помилки записуються окремо. Хостинг може вести власні журнали доступу." },
  de: { title: "Messungen auf der Website", text: "Nutzungsmessungen beginnen erst nach Ihrer Zustimmung. Eine zufällige Kennung im sessionStorage verbindet Seitenaufrufe, eine Herkunftskategorie, PDF-Anfragen, den PDF-Empfang im Browser sowie App-, Community- und Anbieter-Klicks innerhalb dieses Tabs. Diese Datensätze enthalten keine IP-Adressen, vollständigen Herkunfts-URLs, Abfrageparameter oder Nachrichteninhalte. Der PDF-Empfang bestätigt keine Speicherung; Klicks bestätigen keine Installation, keinen Anruf und keine Buchung. Die Auswahl bleibt bis zu 180 Tage im localStorage, lokale Ereignisdateien bis zu 90 Tage. Über die Analyse-Einstellungen unten links können Sie widerrufen: Weitere Nutzungsereignisse stoppen und die Tab-Kennung wird gelöscht. Technische Leistungs- und Fehlerprotokolle sind getrennt. Hostingdienste können eigene Zugriffsprotokolle führen." },
};

export default function PrivacyPolicy() {
  const { t, locale } = useLocale();
  const websiteMetrics = WEBSITE_METRICS[locale];

  return (
    <LegalPageShell
      document="privacy"
      label={t("privacyPage.label")}
      title={t("privacyPage.title")}
      lastUpdated={locale === "uk" ? "Останнє оновлення: 23 жовтня 2026" : locale === "de" ? "Zuletzt aktualisiert: 23. Oktober 2026" : "Last updated: October 23, 2026"}
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
