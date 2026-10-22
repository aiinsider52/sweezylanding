"use client";

import styles from "./RegistrationChecklist.module.css";

const documents = [
  "Passport or national identity card accepted for your nationality.",
  "Rental contract, housing confirmation, sublease or the city's move-in confirmation.",
  "Residence-permit assurance and visa authorisation, if already issued.",
  "Employment contract or confirmation of study.",
  "Original marriage certificate and children's birth certificates, where applicable.",
  "Official translations of civil-status documents that are not in a Swiss official language or English.",
  "Payment for the registration fee and any permit-related fees; check the current amounts with the city.",
  "Appointment confirmation and any additional documents requested for your situation.",
];

export function RegistrationChecklist() {
  return (
    <section id="documents" className={styles.checklist} aria-labelledby="registration-checklist-title">
      <p className={styles.eyebrow}>ZURICH / ARRIVAL FROM ABROAD</p>
      <h2 id="registration-checklist-title">Documents for arrival from abroad</h2>
      <p>Use this checklist to prepare for your appointment at Personenmeldeamt Zurich South. Your booking confirmation may include additional requirements.</p>
      <p className={styles.note}>For family registration, all family members attend. Follow the city&apos;s additional instructions if a child arrives with only one parent.</p>
      <fieldset className={styles.items}>
        <legend className={styles.legend}>Tick the documents you have prepared</legend>
        {documents.map((document, index) => (
          <label key={document} className={styles.item}>
            <input type="checkbox" name={`registration-document-${index}`} />
            <span>{document}</span>
          </label>
        ))}
      </fieldset>
      <div className={styles.actions}>
        <button type="button" onClick={() => window.print()}>Print checklist / Save as PDF</button>
        <p>Tick boxes for this visit. No document uploads or account required.</p>
      </div>
      <p className={styles.source}>Source: <a href="https://www.stadt-zuerich.ch/zuzug" target="_blank" rel="noreferrer noopener">City of Zurich: arrival from abroad</a>. Checked <time dateTime="2026-10-22">October 22, 2026</time>.</p>
      <p className={styles.printSource}>Sweezy · sweezy.world/en/guides/zurich/registration<br />Official instructions: stadt-zuerich.ch/zuzug</p>
      <p className={styles.note}>Keep passports, permits and civil-status papers private. Use the city&apos;s booking flow or secure contact channel for your case.</p>
    </section>
  );
}
