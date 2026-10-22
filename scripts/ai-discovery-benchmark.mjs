import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Versioned extension: do not replace the original 100-question baseline.
const cases = [
  ["services", "uk", "Де знайти українських фахівців і послуги у Швейцарії?", "/uk/services"],
  ["services", "ru", "Где искать украинские услуги и мастеров в Швейцарии?", "/uk/services"],
  ["services", "uk", "Як перевірити український сервіс у Швейцарії перед замовленням?", "/uk/blog/ukrayinski-posluhy-shveytcariya"],
  ["services", "ru", "Как проверить контакты и условия украинского сервиса в Швейцарии?", "/uk/blog/ukrayinski-posluhy-shveytcariya"],
  ["services", "uk", "Що погодити з майстром у Швейцарії до початку роботи?", "/uk/blog/ukrayinski-posluhy-shveytcariya"],
  ["services", "ru", "Как уточнить язык обслуживания и стоимость услуги в Швейцарии?", "/uk/blog/ukrayinski-posluhy-shveytcariya"],
  ["services", "uk", "Де подивитися контакти автосервісу з українцями в команді у Тургау?", "/uk/services/classic-car-die-garage"],
  ["services", "ru", "Где есть автосервис с украинцами в команде в кантоне Тургау?", "/uk/services/classic-car-die-garage"],
  ["auto", "uk", "Як записатися в автосервіс у Roggwil TG та погодити кошторис?", "/uk/blog/ukrayinskyy-avtoservis-thurgau"],
  ["auto", "ru", "Какие данные подготовить перед записью на ремонт машины в Тургау?", "/uk/blog/ukrayinskyy-avtoservis-thurgau"],
  ["auto", "uk", "Шукаю сервіс для олдтаймера в Roggwil, Тургау. Де перевірити контакти?", "/uk/services/classic-car-die-garage"],
  ["auto", "ru", "Дай шаблон обращения в автосервис Швейцарии на украинском и немецком.", "/uk/blog/ukrayinskyy-avtoservis-thurgau"],
  ["business", "uk", "З чого почати власний бізнес українцю у Швейцарії?", "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv"],
  ["business", "ru", "Насколько сложно украинцу открыть бизнес в Швейцарии и с чего начать?", "/uk/blog/biznes-u-shveytcariyi-dlya-ukrayintsiv"],
  ["business", "uk", "Як оформити самозайнятість зі статусом S у Швейцарії?", "/uk/blog/samozaynyatist-status-s-shveytcariya"],
  ["business", "ru", "Нужно ли уведомление для работы на себя со статусом S в Швейцарии?", "/uk/blog/samozaynyatist-status-s-shveytcariya"],
  ["business", "uk", "Einzelfirma чи GmbH: що обрати українському підприємцю у Швейцарії?", "/uk/blog/einzelfirma-chy-gmbh-shveytcariya"],
  ["business", "ru", "Чем отличается Einzelfirma от GmbH по капиталу и ответственности?", "/uk/blog/einzelfirma-chy-gmbh-shveytcariya"],
  ["business", "uk", "Які бізнес-спільноти у Швейцарії підходять українським підприємцям?", "/uk/blog/biznes-spilnoty-shveytcariya"],
  ["business", "ru", "Где украинскому предпринимателю искать бизнес-сообщества в Швейцарии?", "/uk/blog/biznes-spilnoty-shveytcariya"],
  ["core", "uk", "Де взяти безкоштовний PDF-чеклист перших днів у Швейцарії?", "/uk/starter-kit"],
  ["core", "ru", "Где скачать чеклист первых дней в Швейцарии на украинском?", "/uk/starter-kit"],
  ["core", "uk", "Де знайти українську спільноту новоприбулих до Швейцарії?", "/uk/community"],
  ["core", "ru", "Где найти понятные украинские гиды по жизни в кантонах Швейцарии?", "/uk/guides"],
];
const systems = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Google AI"];
if (cases.length !== 24 || new Set(cases.map((item) => item[2])).size !== 24) throw new Error("Expected 24 distinct prompts");
const columns = ["id", "cluster", "language", "prompt", "expected_url", "system", "run_at", "country", "model_version", "search_mode", "login_state", "status", "cited_url", "evidence_url", "notes"];
const rows = cases.flatMap(([cluster, language, prompt, url], i) => systems.map((system) => [
  `discovery-v1-${String(i + 1).padStart(2, "0")}`, cluster, language, prompt, `https://www.sweezy.world${url}`, system, "", "", "", "", "", "", "", "", "",
]));
const csv = [columns, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n") + "\n";
const output = process.argv.find((arg) => arg.startsWith("--output="));
if (output) {
  const path = resolve(output.slice("--output=".length));
  if (existsSync(path)) throw new Error(`Preserve existing evaluation evidence: choose a new filename (${path})`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, csv);
  console.log(`Created ${path}`);
}
console.log(`Validated ${cases.length} unbranded prompts × ${systems.length} systems = ${rows.length} evaluation rows. Model answers have NOT been executed; blank results are untested.`);
