"use client";

import { LegalPageShell } from "../components/LegalPageShell";
import { useLocale } from "../../lib/locale-context";

export default function CookiesPage() {
  const { t } = useLocale();

  return (
    <LegalPageShell
      document="cookies"
      label={t("cookiesPage.label")}
      title={t("cookiesPage.title")}
      lastUpdated={t("cookiesPage.lastUpdated")}
    >
      <section><p>{t("cookiesPage.intro")}</p></section>
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
