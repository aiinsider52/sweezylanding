import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./CorporateHero.module.css";
import { SweezyCompanion } from "./SweezyCompanion";

type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
};

type HeroSignal = {
  label: string;
  value: string;
};

type CorporateHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  sectionCode: string;
  panelLabel: string;
  signals: HeroSignal[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  companion?: "planning" | "community" | "blog" | "jobs";
};

function Action({ action, primary = false }: { action: HeroAction; primary?: boolean }) {
  const className = primary ? styles.primaryAction : styles.secondaryAction;
  const content = <>{action.label}<span aria-hidden>↗</span></>;

  if (action.external) {
    return <a className={className} href={action.href} target="_blank" rel="noreferrer noopener">{content}</a>;
  }

  return <Link className={className} href={action.href}>{content}</Link>;
}

export function CorporateHero({
  eyebrow,
  title,
  description,
  sectionCode,
  panelLabel,
  signals,
  primaryAction,
  secondaryAction,
  companion,
}: CorporateHeroProps) {
  const panelCompanion = companion === "planning"
    ? "planning"
    : companion === "blog"
      ? "reader"
      : companion === "jobs"
        ? "done"
        : null;

  return (
    <header className={`${styles.hero} ${companion ? styles[companion] : ""}`}>
      <div className={styles.copy}>
        <div>
          <div className={styles.kicker}>
            <span>{eyebrow}</span>
            <span>{sectionCode}</span>
          </div>
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>

        {companion === "community" ? <SweezyCompanion pose="greeting" className={styles.welcomeCompanion} priority /> : null}
        {(primaryAction || secondaryAction) ? (
          <div className={styles.actions}>
            {primaryAction ? <Action action={primaryAction} primary /> : null}
            {secondaryAction ? <Action action={secondaryAction} /> : null}
          </div>
        ) : null}
      </div>

      <aside className={styles.signalPanel} aria-label={panelLabel}>
        <div className={styles.panelHead}>
          <span className={styles.statusDot} aria-hidden />
          <span>{panelLabel}</span>
          <span>CH</span>
        </div>
        <ol className={styles.signalList}>
          {signals.slice(0, 3).map((signal, index) => (
            <li key={`${signal.label}-${signal.value}`}>
              <span className={styles.signalIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.signalText}>
                <small>{signal.label}</small>
                <strong>{signal.value}</strong>
              </span>
            </li>
          ))}
        </ol>
        {panelCompanion ? <SweezyCompanion pose={panelCompanion} className={styles.panelCompanion} priority /> : null}
        <p className={styles.panelFoot}>SWEEZY / SWITZERLAND <span aria-hidden>↗</span></p>
      </aside>
    </header>
  );
}
