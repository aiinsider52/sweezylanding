import type { Locale } from "../lib/i18n";

export const PARTNER_EMAIL = "support@sweezy.world";
export const PARTNER_FORMATS = ["listing", "profile", "promotion"] as const;
export type PartnerFormat = typeof PARTNER_FORMATS[number];

type PartnerCopy = {
  title: string; description: string; eyebrow: string; intro: string; cta: string; browse: string;
  scope: string; formatsTitle: string; formats: { title: string; label: string; body: string; action: string }[];
  processTitle: string; steps: { title: string; body: string }[];
  principlesTitle: string; principles: string[]; contactTitle: string; contactBody: string;
  emailNote: string; fallback: string; home: string; faqTitle: string; faq: { question: string; answer: string }[];
};

export const partnerCopy: Record<Locale, PartnerCopy> = {
  uk: {
    title: "Ваш бізнес. Люди, яким ви потрібні.",
    description: "Запропонуйте послугу для каталогу Sweezy або обговоріть підготовку профілю й рекламне розміщення для аудиторії DACH.",
    eyebrow: "SWEEZY / ДЛЯ БІЗНЕСУ", intro: "Допомагаєте з авто, мовами, переїздом чи повсякденними справами? Розкажіть про свій сервіс людям, які облаштовують життя в новій країні.",
    cta: "Обговорити співпрацю", browse: "Переглянути каталог", home: "Головна",
    scope: "Каталог комерційних послуг зараз охоплює Швейцарію. Пропозиції з Німеччини й Австрії приймаємо на розгляд; сторінки країн уже доступні на сайті.",
    formatsTitle: "Оберіть формат співпраці",
    formats: [
      { title: "Картка в каталозі", label: "Безкоштовний розгляд", body: "Назва, послуги, регіон, мови та прямі контакти. Ми звіряємо дані з джерелами перед публікацією. Оплата не потрібна, щоб запропонувати бізнес.", action: "Запропонувати сервіс" },
      { title: "Підготовка профілю", label: "Послуга для бізнесу", body: "Обговоримо підготовку опису вашого сервісу й оформлення матеріалів на основі наданих фактів і фотографій із дозволом на використання. Обсяг, ціну та строки погодимо заздалегідь.", action: "Обговорити профіль" },
      { title: "Рекламне розміщення", label: "За окремою домовленістю", body: "Обговоримо доречне місце, позначку «Реклама», період і звітність до старту. Можливість розміщення залежить від теми, регіону й доступних форматів.", action: "Обговорити рекламу" },
    ],
    processTitle: "Від знайомства до публікації",
    steps: [
      { title: "Розкажіть про бізнес", body: "Надішліть сайт, місто або регіон, перелік послуг, мови та контакт для відповіді." },
      { title: "Погодимо формат", body: "Перевіримо дані. Для платної роботи окремо погодимо результат, вартість, строки та позначення реклами." },
      { title: "Підтвердьте матеріали", body: "Перед публікацією погодимо опис і контакти. Публікація та оплата починаються лише за погодженими умовами." },
    ],
    principlesTitle: "Довіра залишається основою", principles: ["Оплата не купує рекомендацію чи оцінку якості.", "Платне просування має видиму рекламну позначку.", "Не обіцяємо кількість клієнтів, позиції Google чи згадки в ШІ.", "Кліки по контактах не означають замовлення. Звернення та продажі підтверджуються окремо."],
    contactTitle: "Почнімо з вашого сервісу", contactBody: "Яку послугу ви надаєте, де працюєте та кому допомагаєте? Цього достатньо для першої розмови.", emailNote: "Відкриється чернетка у вашій пошті. Ви перевіряєте й надсилаєте лист самостійно. Це не оплата й не оформлення підписки.", fallback: "Пошта не відкрилася? Напишіть напряму:",
    faqTitle: "Перед тим як написати", faq: [
      { question: "Чи потрібно платити за додавання до каталогу?", answer: "Запропонувати сервіс можна безкоштовно. Рішення про публікацію залежить від перевірки даних і відповідності каталогу. Підготовка матеріалів та реклама обговорюються окремо." },
      { question: "Чи можна гарантувати звернення?", answer: "Ні. До початку платного просування потрібно погодити реальний обсяг розміщення та доступні вимірювання. Натискання на телефон або сайт не підтверджує розмову, бронювання чи продаж." },
      { question: "Чи приймаєте ви бізнеси з Німеччини та Австрії?", answer: "Так, можна запропонувати бізнес для розгляду. Комерційний каталог поки працює для Швейцарії; прийняття заявки не означає, що картку вже опубліковано." },
    ],
  },
  en: {
    title: "Your business. The people who need it.", description: "Suggest a service for the Sweezy directory or discuss profile preparation and advertising for a DACH audience.",
    eyebrow: "SWEEZY / FOR BUSINESSES", intro: "Helping with cars, languages, relocation or everyday life? Introduce your service to people building a life in a new country.",
    cta: "Discuss a collaboration", browse: "Explore the directory", home: "Home",
    scope: "The commercial service directory currently covers Switzerland. We welcome suggestions from Germany and Austria for review; country guides are already available on the site.",
    formatsTitle: "Choose a way to work together", formats: [
      { title: "Directory listing", label: "Free review", body: "Business name, services, region, languages and direct contacts. We check details against sources before publication. Suggesting a business does not require payment.", action: "Suggest a service" },
      { title: "Profile preparation", label: "A service for businesses", body: "Discuss a service description and presentation using facts and photos you provide with permission to use them. We agree the scope, price and timing before work starts.", action: "Discuss a profile" },
      { title: "Advertising placement", label: "By separate agreement", body: "Discuss a relevant placement, an advertising label, duration and reporting before launch. Availability depends on the subject, region and supported formats.", action: "Discuss advertising" },
    ],
    processTitle: "From introduction to publication", steps: [
      { title: "Tell us about your business", body: "Send your website, city or region, services, languages and a contact for our reply." },
      { title: "Agree the format", body: "We review the details. For paid work, we agree deliverables, price, timing and advertising disclosure separately." },
      { title: "Confirm the content", body: "We agree the description and contacts before publication. Publication and payment follow the agreed terms." },
    ],
    principlesTitle: "Trust comes first", principles: ["Payment does not buy an endorsement or quality rating.", "Paid promotion carries a visible advertising label.", "We do not promise client numbers, Google rankings or AI mentions.", "Contact clicks are not orders. Enquiries and sales need separate confirmation."],
    contactTitle: "Start with your service", contactBody: "What do you offer, where do you work and who do you help? That is enough for a first conversation.", emailNote: "An email draft opens in your mail app. You review and send it yourself. This does not take payment or start a subscription.", fallback: "Mail app did not open? Write directly to:",
    faqTitle: "Before you write", faq: [
      { question: "Do I need to pay to join the directory?", answer: "Suggesting a service is free. Publication depends on checking the details and directory relevance. Content preparation and advertising are discussed separately." },
      { question: "Can you guarantee enquiries?", answer: "No. Before paid promotion starts, we need to agree the actual placement and available measurements. Clicking a phone number or website does not confirm a conversation, booking or sale." },
      { question: "Can businesses in Germany and Austria apply?", answer: "Yes, you can suggest a business for review. The commercial directory currently covers Switzerland; receiving a suggestion does not mean that a listing is already published." },
    ],
  },
  de: {
    title: "Ihr Angebot. Menschen, die es brauchen.", description: "Schlagen Sie einen Service für das Sweezy-Verzeichnis vor oder besprechen Sie Profilgestaltung und Werbung für eine DACH-Zielgruppe.",
    eyebrow: "SWEEZY / FÜR UNTERNEHMEN", intro: "Helfen Sie bei Autos, Sprachen, beim Umzug oder im Alltag? Stellen Sie Ihren Service Menschen vor, die sich in einem neuen Land einleben.",
    cta: "Zusammenarbeit besprechen", browse: "Verzeichnis ansehen", home: "Startseite",
    scope: "Das kommerzielle Serviceverzeichnis deckt derzeit die Schweiz ab. Vorschläge aus Deutschland und Österreich nehmen wir zur Prüfung entgegen; Länderratgeber sind bereits verfügbar.",
    formatsTitle: "Wählen Sie die passende Zusammenarbeit", formats: [
      { title: "Verzeichniseintrag", label: "Kostenlose Prüfung", body: "Name, Leistungen, Region, Sprachen und direkte Kontakte. Wir gleichen die Angaben vor der Veröffentlichung mit Quellen ab. Ein Unternehmen vorzuschlagen ist kostenlos.", action: "Service vorschlagen" },
      { title: "Profilgestaltung", label: "Service für Unternehmen", body: "Wir besprechen Beschreibung und Gestaltung anhand Ihrer Fakten und Fotos mit entsprechender Nutzungserlaubnis. Umfang, Preis und Termine vereinbaren wir vor Arbeitsbeginn.", action: "Profil besprechen" },
      { title: "Werbeplatzierung", label: "Nach Vereinbarung", body: "Wir besprechen Platzierung, Werbekennzeichnung, Laufzeit und Auswertung vor dem Start. Die Möglichkeiten richten sich nach Thema, Region und verfügbaren Formaten.", action: "Werbung besprechen" },
    ],
    processTitle: "Vom Kennenlernen zur Veröffentlichung", steps: [
      { title: "Unternehmen vorstellen", body: "Senden Sie Website, Ort oder Region, Leistungen, Sprachen und einen Kontakt für unsere Antwort." },
      { title: "Format vereinbaren", body: "Wir prüfen die Angaben. Bei bezahlter Arbeit vereinbaren wir Leistungen, Preis, Termine und Werbekennzeichnung separat." },
      { title: "Inhalte bestätigen", body: "Beschreibung und Kontakte stimmen wir vor der Veröffentlichung ab. Veröffentlichung und Zahlung erfolgen zu den vereinbarten Bedingungen." },
    ],
    principlesTitle: "Vertrauen bleibt die Grundlage", principles: ["Eine Zahlung kauft keine Empfehlung oder Qualitätsbewertung.", "Bezahlte Werbung wird sichtbar gekennzeichnet.", "Wir versprechen keine Kundenzahlen, Google-Positionen oder KI-Erwähnungen.", "Kontaktklicks sind keine Aufträge. Anfragen und Verkäufe müssen separat bestätigt werden."],
    contactTitle: "Beginnen wir mit Ihrem Service", contactBody: "Was bieten Sie an, wo arbeiten Sie und wem helfen Sie? Das reicht für ein erstes Gespräch.", emailNote: "Ein Entwurf öffnet sich in Ihrer E-Mail-App. Sie prüfen und senden ihn selbst. Es wird weder eine Zahlung ausgelöst noch ein Abo abgeschlossen.", fallback: "E-Mail-App nicht geöffnet? Schreiben Sie direkt an:",
    faqTitle: "Vor Ihrer Nachricht", faq: [
      { question: "Ist der Eintrag kostenpflichtig?", answer: "Einen Service vorzuschlagen ist kostenlos. Die Veröffentlichung hängt von der Prüfung der Angaben und der Relevanz ab. Inhaltserstellung und Werbung werden separat besprochen." },
      { question: "Garantieren Sie Anfragen?", answer: "Nein. Vor bezahlter Werbung müssen die tatsächliche Platzierung und die verfügbaren Messungen vereinbart werden. Ein Klick auf Telefonnummer oder Website bestätigt weder Gespräch noch Buchung oder Verkauf." },
      { question: "Können Unternehmen aus Deutschland und Österreich mitmachen?", answer: "Ja, Sie können ein Unternehmen zur Prüfung vorschlagen. Das kommerzielle Verzeichnis deckt derzeit die Schweiz ab. Ein eingegangener Vorschlag ist noch kein veröffentlichter Eintrag." },
    ],
  },
};

export function partnerEmailHref(locale: Locale, format?: PartnerFormat) {
  const c = partnerCopy[locale];
  const index = format ? PARTNER_FORMATS.indexOf(format) : -1;
  const subject = `Sweezy / ${index >= 0 ? c.formats[index].title : c.cta}`;
  const body = locale === "uk" ? "Назва бізнесу:\nСайт:\nКраїна та регіон:\nПослуги:\nМови:\nКонтакт для відповіді:\n" : locale === "de" ? "Unternehmen:\nWebsite:\nLand und Region:\nLeistungen:\nSprachen:\nKontakt für die Antwort:\n" : "Business name:\nWebsite:\nCountry and region:\nServices:\nLanguages:\nReply contact:\n";
  return `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
