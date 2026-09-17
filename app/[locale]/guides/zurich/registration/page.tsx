import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { JsonLd } from "../../../../components/seo/JsonLd";
import { BASE_URL } from "../../../../../lib/alternates";
import styles from "../../../editorial.module.css";

const PATH = "/en/guides/zurich/registration";
const URL = `${BASE_URL}${PATH}`;
const REVIEWED_AT = "2026-09-17";
const CITY_ARRIVAL_URL = "https://www.stadt-zuerich.ch/zuzug";
const CITY_MOVE_URL = "https://www.stadt-zuerich.ch/umzug";
const CANTON_MIGRATION_URL = "https://www.zh.ch/de/sicherheitsdirektion/migrationsamt.html";

const faq = [
  {
    q: "How long do I have to register after moving to Zurich?",
    a: "The City of Zurich requires registration within 14 days. Registration starts only after the effective move-in date.",
  },
  {
    q: "Where do I register when arriving in Zurich from abroad?",
    a: "Book the City of Zurich's arrival-from-abroad appointment. The appointment takes place in person at Personenmeldeamt Zurich South.",
  },
  {
    q: "Can I register a move to Zurich online?",
    a: "If you are moving from another Swiss municipality, check whether your case can use eUmzugCH. Arrivals from abroad must attend in person with an appointment.",
  },
  {
    q: "Is Personenmeldeamt the same as Migrationsamt Zurich?",
    a: "No. Personenmeldeamt handles city resident registration. The Canton Zurich Migration Office examines applications and issues entry and residence permits.",
  },
];

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== "en") return {};
  const title = "Register in Zurich: 14-Day Deadline, Appointment & Documents";
  const description = "Register in Zurich after moving: choose the correct appointment, check the 14-day deadline, prepare documents, and separate city registration from permits.";
  return {
    title,
    description,
    alternates: { canonical: URL },
    openGraph: {
      title,
      description,
      url: URL,
      siteName: "Sweezy",
      type: "article",
      images: [{ url: "/images/canton-zurich.jpg", width: 1200, height: 630, alt: "Zurich city registration guide" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/canton-zurich.jpg"] },
  };
}

export default function ZurichRegistrationPage({ params }: { params: { locale: string } }) {
  if (params.locale !== "en") notFound();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Register in Zurich: Appointment and Documents",
      description: "Official-source guide to resident registration after moving to Zurich.",
      url: URL,
      inLanguage: "en",
      dateModified: REVIEWED_AT,
      citation: [CITY_ARRIVAL_URL, CITY_MOVE_URL, CANTON_MIGRATION_URL],
      isPartOf: { "@type": "WebSite", name: "Sweezy", url: BASE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <main lang="en" className={styles.page}>
      <JsonLd data={schema} />
      <article className={styles.articleShell}>
        <Breadcrumb items={[
          { name: "Home", url: "/en" },
          { name: "Guides", url: "/en/guides" },
          { name: "Zurich", url: "/en/guides/zurich" },
          { name: "Registration", url: URL },
        ]} />

        <header className={styles.articleHero}>
          <div className={styles.articleIntro}>
            <div>
              <span className={styles.eyebrow}>ZURICH / REGISTRATION</span>
              <p className={styles.meta}>Official-source guide · Reviewed September 17, 2026</p>
              <h1>Register in Zurich: appointment, deadline and documents</h1>
              <p>Choose the correct city process before booking. Arrival from abroad, arrival from another Swiss municipality and an address change inside Zurich follow different routes.</p>
            </div>
            <div className="mt-10 border-t border-white/15 pt-5 text-sm text-white/60">
              Narrow guide for city registration. For housing, insurance and permits, use the full <Link href="/en/guides/zurich" className="font-semibold text-white underline underline-offset-4">moving-to-Zurich guide</Link>.
            </div>
          </div>
          <div className={styles.articleVisual}>
            <Image src="/images/canton-zurich.jpg" alt="Zurich city and lake" fill priority sizes="(max-width: 800px) 100vw, 40vw" className="object-cover" />
          </div>
        </header>

        <section className={styles.answerPanel} aria-labelledby="registration-short-answer">
          <div className={styles.answerMain}>
            <span className={styles.eyebrow}>Short answer</span>
            <h2 id="registration-short-answer">Register within 14 days after your effective move. Arriving from abroad requires an in-person appointment at Personenmeldeamt Zurich South.</h2>
            <dl className={styles.answerFacts}>
              <div><dt>Deadline</dt><dd>Within 14 days</dd></div>
              <div><dt>From abroad</dt><dd>In person, by appointment</dd></div>
              <div><dt>Last reviewed</dt><dd><time dateTime={REVIEWED_AT}>September 17, 2026</time></dd></div>
            </dl>
          </div>
          <div className={styles.answerEvidence}>
            <span className={styles.eyebrow}>Official sources</span>
            <ol className={styles.sourceList}>
              <li><a href={CITY_ARRIVAL_URL} target="_blank" rel="noreferrer noopener">City of Zurich: arrival registration <span aria-hidden>↗</span></a></li>
              <li><a href={CITY_MOVE_URL} target="_blank" rel="noreferrer noopener">City of Zurich: move within city <span aria-hidden>↗</span></a></li>
              <li><a href={CANTON_MIGRATION_URL} target="_blank" rel="noreferrer noopener">Canton Zurich Migration Office <span aria-hidden>↗</span></a></li>
            </ol>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <nav className={styles.articleRail} aria-label="On this page">
            <div className={styles.articleRailBlock}><span className={styles.eyebrow}>01</span><strong><a href="#route">Choose route</a></strong></div>
            <div className={styles.articleRailBlock}><span className={styles.eyebrow}>02</span><strong><a href="#documents">Documents</a></strong></div>
            <div className={styles.articleRailBlock}><span className={styles.eyebrow}>03</span><strong><a href="#offices">City vs canton</a></strong></div>
            <div className={styles.articleRailBlock}><span className={styles.eyebrow}>04</span><strong><a href="#faq">FAQ</a></strong></div>
          </nav>

          <div className={styles.articleBody}>
            <section id="route" className="scroll-mt-24">
              <h2>Which Zurich registration route applies?</h2>
              <p>Use the route that matches where you moved from. Similar names in the booking system do not mean the procedures are interchangeable.</p>
              <div className="mt-6 overflow-x-auto rounded-lg border border-black/15 bg-white">
                <table className="min-w-[620px] w-full border-collapse text-left text-sm">
                  <thead><tr><th className="p-4">Situation</th><th className="p-4">Route</th><th className="p-4">Important detail</th></tr></thead>
                  <tbody>
                    <tr><td className="border-t border-black/15 p-4 font-semibold">Arriving from abroad</td><td className="border-t border-black/15 p-4">Book the arrival-from-abroad appointment</td><td className="border-t border-black/15 p-4">Attend in person at Zurich South. All family members attend a family registration.</td></tr>
                    <tr><td className="border-t border-black/15 p-4 font-semibold">Moving from another Swiss municipality</td><td className="border-t border-black/15 p-4">Check eUmzugCH or book an in-person appointment</td><td className="border-t border-black/15 p-4">Complete the previous municipality's departure requirement first.</td></tr>
                    <tr><td className="border-t border-black/15 p-4 font-semibold">Changing address inside Zurich city</td><td className="border-t border-black/15 p-4">Report online or book an appointment</td><td className="border-t border-black/15 p-4">The city's online address-change form is only for existing Zurich residents.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>City registration is due within 14 days. For a new arrival, the city accepts registration only after the effective move-in date.</p>
            </section>

            <section id="documents" className="scroll-mt-24">
              <h2>Documents for arrival from abroad</h2>
              <p>The official city list includes the following items. Your appointment confirmation may add case-specific requirements.</p>
              <ul>
                <li>Passport. EU/EFTA nationals may use a national identity card.</li>
                <li>Rental contract, housing confirmation or sublease.</li>
                <li>Assurance of a residence permit or visa authorisation, if already issued.</li>
                <li>Employment contract or proof of study.</li>
                <li>Original civil-status documents for relevant family cases.</li>
                <li>Payment for migration-related fees, which depend on permit type.</li>
              </ul>
              <p>Do not upload passports, permits or civil-status papers to public chats. Use the city's booking flow or secure contact channel.</p>
            </section>

            <section id="offices" className="scroll-mt-24">
              <h2>Personenmeldeamt and Migrationsamt do different work</h2>
              <p><strong>Personenmeldeamt Stadt Zurich</strong> handles city resident registration and address changes. <strong>Migrationsamt des Kantons Zurich</strong> examines applications and issues entry and residence permits. Registering the address does not mean every permit step is complete.</p>
              <p>The cantonal Migration Office is at Berninastrasse 45, 8090 Zurich. Its official page lists permit topics, forms, counter hours and the contact form. The office states that it does not provide a general email address.</p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2>Zurich registration FAQ</h2>
              {faq.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}
            </section>

            <section>
              <h2>Continue your move</h2>
              <ul>
                <li><Link href="/en/guides/zurich">Moving to Zurich: housing, insurance and first steps</Link></li>
                <li><Link href="/en/blog/how-to-register-switzerland">How to register in Switzerland</Link></li>
                <li><Link href="/en/blog/swiss-residence-permit-guide">Swiss residence permit guide</Link></li>
              </ul>
            </section>
          </div>

          <aside className={styles.articleAside}>
            <span className={styles.eyebrow}>NEXT STEP</span>
            <h2>Finish the full Zurich checklist</h2>
            <p className="mt-4 text-sm leading-6 text-black/65">Registration is one step. Keep housing, permit follow-up, insurance and local contacts in one route.</p>
            <Link href="/en/guides/zurich" className="mt-5 inline-flex font-semibold underline underline-offset-4">Open Zurich guide →</Link>
          </aside>
        </div>
      </article>
    </main>
  );
}
