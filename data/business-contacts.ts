import type { Locale } from "../lib/i18n";

type Local = Record<Locale, string>;
type Contact = { question: Local; office: Local; answer: Local; source: { name: string; url: string } };
export const BUSINESS_CONTACTS_CHECKED_AT = "2026-10-27";
export const businessContacts: Record<"germany" | "austria", Contact[]> = {
  germany: [
    {
      question: { uk: "Чи дозволяє мій документ самозайнятість?", en: "Does my residence document allow self-employment?", de: "Erlaubt mein Aufenthaltsdokument Selbstständigkeit?" },
      office: { uk: "Ausländerbehörde", en: "Foreigners authority", de: "Ausländerbehörde" },
      answer: { uk: "Покажіть чинний документ і опис діяльності. Уточніть умови саме вашої підстави перебування.", en: "Show your current document and planned activity. Clarify the conditions of your particular residence basis.", de: "Zeigen Sie Ihr aktuelles Dokument und die geplante Tätigkeit. Klären Sie die Bedingungen Ihres Aufenthaltsrechts." },
      source: { name: "Make it in Germany — self-employment", url: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/other/self-employment" },
    },
    {
      question: { uk: "Куди реєструвати діяльність?", en: "Where do I register the activity?", de: "Wo melde ich die Tätigkeit an?" },
      office: { uk: "Gewerbeamt / Finanzamt", en: "Trade office / tax office", de: "Gewerbeamt / Finanzamt" },
      answer: { uk: "Для Gewerbe звертайтеся до місцевого Gewerbeamt; для вільної професії — до Finanzamt. Спочатку уточніть класифікацію послуг.", en: "Contact the local trade office for a trade, or the tax office for a liberal profession. Clarify your activity's classification first.", de: "Für ein Gewerbe ist das örtliche Gewerbeamt zuständig, für freie Berufe das Finanzamt. Klären Sie zuerst die Einordnung." },
      source: { name: "Make it in Germany — business registration", url: "https://www.make-it-in-germany.com/en/working-in-germany/starting-business/steps" },
    },
  ],
  austria: [
    {
      question: { uk: "Хто приймає Gewerbeanmeldung?", en: "Who handles trade registration?", de: "Wer nimmt die Gewerbeanmeldung entgegen?" },
      office: { uk: "Gewerbebehörde за місцем бізнесу", en: "Trade authority at the business location", de: "Gewerbebehörde am Betriebsstandort" },
      answer: { uk: "Зазвичай це Bezirkshauptmannschaft або Magistrat. У Відні відповідальна установа залежить від виду Gewerbe.", en: "Usually the district authority or municipal magistrate. In Vienna, the responsible office depends on the trade.", de: "In der Regel Bezirkshauptmannschaft oder Magistrat. In Wien hängt die zuständige Stelle vom Gewerbe ab." },
      source: { name: "USP — Gewerbeanmeldung", url: "https://www.usp.gv.at/gruendung/EAP/gewerbeanmeldung.html" },
    },
    {
      question: { uk: "Чи потрібне підтвердження кваліфікації?", en: "Do I need proof of professional competence?", de: "Brauche ich einen Befähigungsnachweis?" },
      office: { uk: "Gewerbebehörde", en: "Trade authority", de: "Gewerbebehörde" },
      answer: { uk: "Для регульованого Gewerbe перевірте Befähigungsnachweis або передбачений альтернативний порядок. Класифікацію уточнюйте для фактичних послуг.", en: "For a regulated trade, check the competence certificate or an applicable alternative procedure. Classify the actual services you plan to provide.", de: "Bei reglementierten Gewerben sind Befähigungsnachweis oder ein zulässiges alternatives Verfahren zu klären. Entscheidend ist die tatsächliche Tätigkeit." },
      source: { name: "USP — individuelle Befähigung", url: "https://www.usp.gv.at/gruendung/EAP/feststellung-individuelle-befaehigung.html" },
    },
  ],
};
