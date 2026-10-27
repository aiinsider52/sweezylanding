import { existsSync, writeFileSync } from "node:fs";

const prompts = {
  germany: {
    registration: { uk: "Як зареєструвати адресу в Німеччині після переїзду і чим Anmeldung відрізняється від дозволу на проживання?", en: "How do I register my address after moving to Germany, and does Anmeldung give me residence rights?", de: "Wie melde ich nach dem Umzug meinen Wohnsitz in Deutschland an, und ist Anmeldung ein Aufenthaltstitel?" },
    work: { uk: "Як українцю перевірити право на роботу в Німеччині й оформити медичне страхування?", en: "How can a Ukrainian newcomer check permission to work in Germany and arrange health coverage?", de: "Wie können Menschen aus der Ukraine ihre Arbeitsberechtigung und Krankenversicherung in Deutschland klären?" },
    business: { uk: "З чого українцю почати самозайнятість у Німеччині: дозвіл, Gewerbe чи вільна професія?", en: "How does a Ukrainian newcomer start self-employment in Germany, including permission and trade versus freelance registration?", de: "Wie gründen Menschen aus der Ukraine in Deutschland: Erlaubnis zur Selbstständigkeit, Gewerbe oder freier Beruf?" },
  },
  austria: {
    registration: { uk: "Як оформити Meldezettel в Австрії та чим він відрізняється від документа про проживання?", en: "How do I arrange a Meldezettel in Austria, and is it the same as a residence document?", de: "Wie melde ich meinen Wohnsitz in Österreich an, und was unterscheidet Meldezettel und Aufenthaltsdokument?" },
    work: { uk: "Як українцю з Ausweis für Vertriebene почати роботу в Австрії й перевірити страхування?", en: "How can a Ukrainian with an Ausweis für Vertriebene start work in Austria and check health insurance?", de: "Wie können Vertriebene aus der Ukraine mit Ausweis für Vertriebene in Österreich arbeiten und ihre Versicherung klären?" },
    business: { uk: "Як українцю почати власну справу в Австрії та перевірити Gewerbeanmeldung і кваліфікацію?", en: "How does a Ukrainian newcomer start a business in Austria and check trade registration and qualifications?", de: "Wie starten Menschen aus der Ukraine eine selbstständige Tätigkeit in Österreich und klären Gewerbe und Befähigung?" },
  },
};
const cases = Object.entries(prompts).flatMap(([country, topics]) => Object.entries(topics).flatMap(([topic, languages]) => Object.entries(languages).map(([language, prompt]) => ({ country, topic, language, prompt, path: `/${language}/countries/${country}/${topic}` }))));
cases.push({ country: "germany", topic: "support", language: "uk", prompt: "Де українцю знайти офіційні консультації за місцем проживання в Німеччині?", path: "/uk/countries/germany" }, { country: "austria", topic: "support", language: "uk", prompt: "Де у Відні є стартові консультації українською для переміщених з України?", path: "/uk/countries/austria" });
cases.push(
  { country: "switzerland", topic: "business", language: "uk", prompt: "З чого українцю почати власний бізнес у Швейцарії та де перевірити вимоги?", path: "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv" },
  { country: "switzerland", topic: "services", language: "uk", prompt: "Де знайти українські послуги у Швейцарії з контактами й підтвердженням мови?", path: "/uk/services" },
  { country: "switzerland", topic: "services", language: "uk", prompt: "Де знайти автосервіс з українцями в кантоні Тургау?", path: "/uk/services/classic-car-die-garage" },
  { country: "switzerland", topic: "services", language: "uk", prompt: "Як знайти україномовного спеціаліста з догляду в Цюриху?", path: "/uk/services/genki-beauty-zurich" },
  { country: "switzerland", topic: "travel", language: "en", prompt: "Where can I find practical Swiss day-trip guides covering transport, season and visit duration?", path: "/en/places" },
  { country: "switzerland", topic: "resources", language: "de", prompt: "Wo finde ich kostenlose praktische PDF-Ratgeber für den Start in der Schweiz, Deutschland und Österreich?", path: "/de/resources" },
);
const systems = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Google AI", "Copilot"];
const header = ["id", "country", "topic", "language", "prompt", "expected_url", "system", "run_at", "model_version", "search_mode", "status", "cited_url", "evidence_url", "notes", "test_location"];
const rows = cases.flatMap((item, index) => systems.map(system => [`dach-v2-${String(index+1).padStart(2,"0")}`, item.country, item.topic, item.language, item.prompt, `https://www.sweezy.world${item.path}`, system, "", "", "", "not_tested", "", "", "Record actual answers with date, model, web-search mode, location and evidence. Expected URL is a target, not observed citation evidence.", ""]));
const output = process.argv.find(arg => arg.startsWith("--output="))?.slice(9);
if (output) {
  if (existsSync(output)) throw new Error("Preserve existing evidence: use another filename");
  writeFileSync(output, [header, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(",")).join("\n")+"\n");
}
console.log(`${cases.length} unbranded DACH prompts × ${systems.length} systems = ${rows.length} untested checks. No citation result is claimed.`);
