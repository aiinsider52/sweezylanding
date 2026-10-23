const fs = require("node:fs");
const ts = require("typescript");
const { runInNewContext } = require("node:vm");
function load(file) { const result = {}; runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports: result }); return result; }
const { DOWNLOADS, DOWNLOAD_IDS, downloadFilename } = load("data/downloads.ts");
const { countrySources } = load("data/dach.ts");
const guides = require("../data/dach-guides.json");
const swiss = {
  uk: [
    { title: "Право на діяльність", tasks: ["Уточнити, чи дозволяє мій документ самозайнятість і яка процедура діє в кантоні.", "Підготувати опис діяльності, клієнтів і підтвердження реального плану роботи.", "Перевірити професійні дозволи та вимоги до визнання кваліфікації."] },
    { title: "Форма й реєстрація", tasks: ["Порівняти Einzelfirma та GmbH за відповідальністю, витратами й обліком.", "Уточнити реєстрацію діяльності та визнання самозайнятості в Ausgleichskasse.", "З’ясувати, чи потрібен Handelsregister для моєї форми та ситуації."] },
    { title: "Фінанси та страхування", tasks: ["Скласти бюджет запуску, поточних витрат і резерв на перші місяці.", "Уточнити податкові обов’язки, ПДВ та спосіб ведення обліку.", "Узгодити соціальне страхування, медичне покриття й відповідальність."] },
    { title: "Перед першим замовленням", tasks: ["Описати послугу, ціну, додаткові витрати та порядок оплати.", "Підготувати письмові умови, рахунок і правила скасування.", "Знайти консультацію в кантоні та перевірити профільну бізнес-спільноту."] },
  ],
  en: [
    { title: "Permission to operate", tasks: ["Confirm whether my residence document permits self-employment and which cantonal procedure applies.", "Prepare an activity description, customer profile and evidence of a workable business plan.", "Check professional licences and qualification-recognition requirements."] },
    { title: "Structure and registration", tasks: ["Compare a sole proprietorship and GmbH for liability, costs and accounting.", "Clarify business registration and recognition of self-employment by the compensation office.", "Check whether commercial-register entry is required for my structure and circumstances."] },
    { title: "Finance and insurance", tasks: ["Plan startup costs, running expenses and a reserve for the first months.", "Clarify tax duties, VAT treatment and an appropriate bookkeeping process.", "Check social insurance, health coverage and liability protection."] },
    { title: "Before your first order", tasks: ["Define the service, price, extra costs and payment schedule.", "Prepare written terms, invoicing and cancellation conditions.", "Find cantonal startup advice and a relevant business community."] },
  ],
  de: [
    { title: "Berechtigung zur Tätigkeit", tasks: ["Klären, ob mein Aufenthaltsdokument Selbstständigkeit erlaubt und welches kantonale Verfahren gilt.", "Tätigkeit, Kundengruppe und Nachweise eines tragfähigen Geschäftsplans vorbereiten.", "Berufszulassungen und Anerkennung der Qualifikation prüfen."] },
    { title: "Rechtsform und Anmeldung", tasks: ["Einzelfirma und GmbH hinsichtlich Haftung, Kosten und Buchführung vergleichen.", "Anmeldung der Tätigkeit und Anerkennung der Selbstständigkeit durch die Ausgleichskasse klären.", "Prüfen, ob für meine Rechtsform und Situation ein Handelsregistereintrag nötig ist."] },
    { title: "Finanzen und Versicherungen", tasks: ["Startkosten, laufende Ausgaben und eine Reserve für die ersten Monate planen.", "Steuerpflichten, Mehrwertsteuer und Buchführung klären.", "Sozialversicherung, Krankenversicherung und Haftpflicht prüfen."] },
    { title: "Vor dem ersten Auftrag", tasks: ["Leistung, Preis, Zusatzkosten und Zahlungsablauf festhalten.", "Schriftliche Bedingungen, Rechnungen und Stornoregeln vorbereiten.", "Kantonale Gründungsberatung und eine passende Unternehmergemeinschaft finden."] },
  ],
};
const result = [];
for (const id of DOWNLOAD_IDS.filter(id => !["first-week", "travel-kit"].includes(id))) for (const locale of ["uk", "en", "de"]) {
  const item = DOWNLOADS[id], country = item.country;
  const topic = id.startsWith("business") ? "business" : "registration";
  const sections = country === "switzerland" ? swiss[locale] : guides[country][topic][locale].sections.map(section => ({ title: section.title, tasks: section.checklist }));
  result.push({ id, locale, country, title: item.title[locale], description: item.description[locale], filename: downloadFilename(id, locale), sections, sources: countrySources[country], guide: country === "switzerland" ? `https://www.sweezy.world/${locale}/countries/switzerland#business` : `https://www.sweezy.world/${locale}/countries/${country}/${topic}` });
}
process.stdout.write(JSON.stringify(result));
