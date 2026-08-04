"use client";

import { LegalPageShell } from "../components/LegalPageShell";
import { useLocale } from "../../lib/locale-context";

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <LegalPageShell
      document="terms"
      label={t("termsPage.label")}
      title={t("termsPage.title")}
      lastUpdated={t("termsPage.lastUpdated")}
    >
      <section><p>{t("termsPage.intro")}</p></section>
      <section><h2>{t("termsPage.s1Title")}</h2><p>{t("termsPage.s1Text")}</p></section>
      <section><h2>{t("termsPage.s2Title")}</h2><p>{t("termsPage.s2Text")}</p></section>
      <section><h2>{t("termsPage.s3Title")}</h2><p>{t("termsPage.s3Text")}</p></section>
      <section>
        <h2>{t("termsPage.s4Title")}</h2>
        <p>{t("termsPage.s4Intro")}</p>
        <ul>
          <li>{t("termsPage.s4Item1")}</li>
          <li>{t("termsPage.s4Item2")}</li>
          <li>{t("termsPage.s4Item3")}</li>
        </ul>
      </section>
      <section><h2>{t("termsPage.s5Title")}</h2><p>{t("termsPage.s5Text")}</p></section>
      <section><h2>{t("termsPage.s6Title")}</h2><p>{t("termsPage.s6Text")}</p></section>
      <section><h2>{t("termsPage.s7Title")}</h2><p>{t("termsPage.s7Text")}</p></section>
      <section><h2>{t("termsPage.s8Title")}</h2><p>{t("termsPage.s8Text")}</p></section>
      <section><h2>{t("termsPage.s9Title")}</h2><p>{t("termsPage.s9Text")}</p></section>
      <section>
        <h2>{t("termsPage.s10Title")}</h2>
        <p>{t("termsPage.s10Text")} <a href={`mailto:${t("termsPage.email")}`}>{t("termsPage.email")}</a>.</p>
      </section>
    </LegalPageShell>
  );
}
