"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../../lib/i18n";
import type { LandingCopy } from "../../../lib/landing-copy";
import styles from "./landing.module.css";

const PARTNER_EMAIL = "support@sweezy.world";

type PartnerNetworkProps = {
  copy: LandingCopy["partner"];
  locale: Locale;
};

export function PartnerNetwork({ copy, locale }: PartnerNetworkProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const organizationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formOpen) return;
    organizationRef.current?.focus();
  }, [formOpen]);

  const positionFor = (index: number) => {
    if (index === activeIndex) return "active";
    if (index === (activeIndex + 1) % copy.types.length) return "right";
    return "left";
  };

  const openForm = () => {
    setDraftOpened(false);
    setFormOpen(true);
  };

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const organization = String(data.get("organization") ?? "").trim();
    const partnershipType = String(data.get("partnershipType") ?? "").trim();
    const canton = String(data.get("canton") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = `Sweezy Partner Network — ${organization}`;
    const body = [
      "Sweezy Partner Network application",
      "",
      `Language: ${locale.toUpperCase()}`,
      `${copy.form.organization}: ${organization}`,
      `${copy.form.type}: ${partnershipType}`,
      `${copy.form.canton}: ${canton}`,
      `${copy.form.website}: ${website || "—"}`,
      `${copy.form.email}: ${email}`,
    ].join("\n");

    setDraftOpened(true);
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="partners" className={styles.partnerSection} aria-labelledby="partner-network-title">
      <div className={styles.partnerHeader}>
        <div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="partner-network-title">{copy.title}</h2>
        </div>
        <div className={styles.partnerIntro}>
          <p>{copy.body}</p>
          <div className={styles.partnerActions}>
            <button type="button" className={styles.partnerPrimary} aria-expanded={formOpen} onClick={openForm}>
              {copy.primary}<span aria-hidden>↗</span>
            </button>
            <a href="#partner-flow" className={styles.partnerSecondary}>{copy.secondary}</a>
          </div>
        </div>
      </div>

      <div className={styles.partnerTicker} aria-hidden="true">
        <div>
          {[0, 1].map((copyIndex) => (
            <span key={copyIndex} className={styles.partnerTickerSet}>
              <span>VERIFIED SERVICES</span><i>●</i><span>LOCAL EXPERTS</span><i>●</i><span>COMMUNITIES</span><i>●</i>
              <span>EMPLOYERS</span><i>●</i><span>INSTITUTIONS</span><i>●</i><span>SWEEZY NETWORK</span><i>●</i>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.partnerExperience}>
        <div className={styles.partnerIndex} aria-label={copy.passport}>
          <span>{copy.passport}</span>
          <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(copy.types.length).padStart(2, "0")}</strong>
          <div role="group" aria-label={copy.passport}>
            {copy.types.map((type, index) => (
              <button
                key={type.label}
                type="button"
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>{type.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.partnerPassportStage} role="group" aria-label={copy.passport}>
          {copy.types.map((type, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={type.label}
                type="button"
                className={styles.partnerPassport}
                data-position={positionFor(index)}
                data-tone={index}
                aria-label={`${type.label}: ${type.title}`}
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.partnerPassportTop}>
                  <span>SWEEZY®</span>
                  <span>{copy.verified}<b aria-hidden>✓</b></span>
                </span>
                <span className={styles.partnerPassportBody}>
                  <span className={styles.partnerPassportKicker}>{type.kicker}</span>
                  <strong>{type.title}</strong>
                  <span className={styles.partnerPassportDescription}>{type.body}</span>
                  <span className={styles.partnerPassportBenefits}>
                    {type.benefits.map((benefit) => <span key={benefit}><b aria-hidden>✓</b>{benefit}</span>)}
                  </span>
                </span>
                <span className={styles.partnerPassportBottom}>
                  <span>{type.label}</span>
                  <span>CH · {String(index + 1).padStart(2, "0")}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="partner-flow" className={styles.partnerFlow}>
        <p>{copy.flowLabel}</p>
        <ol>
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {formOpen ? (
        <div className={styles.partnerFormPanel}>
          <div className={styles.partnerFormHeading}>
            <div><span>PARTNER APPLICATION</span><h3>{copy.form.title}</h3><p>{copy.form.body}</p></div>
            <button type="button" onClick={() => setFormOpen(false)} aria-label={copy.form.close}>×</button>
          </div>
          <form onSubmit={submitApplication} className={styles.partnerForm}>
            <label>
              <span>{copy.form.organization}</span>
              <input ref={organizationRef} name="organization" required autoComplete="organization" placeholder={copy.form.organizationPlaceholder} />
            </label>
            <label>
              <span>{copy.form.type}</span>
              <select name="partnershipType" required defaultValue={copy.types[activeIndex].label}>
                {copy.types.map((type) => <option key={type.label} value={type.label}>{type.label}</option>)}
              </select>
            </label>
            <label>
              <span>{copy.form.canton}</span>
              <input name="canton" required autoComplete="address-level1" placeholder={copy.form.cantonPlaceholder} />
            </label>
            <label>
              <span>{copy.form.website}</span>
              <input name="website" type="url" inputMode="url" autoComplete="url" placeholder={copy.form.websitePlaceholder} />
            </label>
            <label>
              <span>{copy.form.email}</span>
              <input name="email" type="email" required inputMode="email" autoComplete="email" placeholder={copy.form.emailPlaceholder} />
            </label>
            <div className={styles.partnerFormSubmit}>
              <button type="submit">{copy.form.submit}<span aria-hidden>→</span></button>
              <p>{copy.form.note}</p>
            </div>
          </form>
          <p className={styles.partnerFormStatus} aria-live="polite">{draftOpened ? copy.form.opened : ""}</p>
        </div>
      ) : null}
    </section>
  );
}
