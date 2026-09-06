import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const clusters = {
  status_s: { count: 40, topics: ["права", "продовження", "документи", "робота", "житло", "возз'єднання сім'ї", "виїзд", "відмова", "соціальна допомога", "навчання"], url: "/uk/blog/status-s-shveytcariya-povnyy-gid" },
  permits_registration: { count: 20, topics: ["реєстрація в Gemeinde", "дозвіл на проживання", "строки реєстрації", "потрібні документи", "міграційний офіс"], url: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi" },
  work: { count: 15, topics: ["пошук роботи", "швейцарське CV", "дозвіл на роботу", "вакансії", "зарплата"], url: "/uk/blog/poshuk-roboty-shveytcariya-2026" },
  insurance: { count: 10, topics: ["медичне страхування", "франшиза", "субсидія", "страхова каса", "термін оформлення"], url: "/uk/blog/medychne-strakhuvannya-shveytcariya" },
  cantons: { count: 10, topics: ["Цюрих", "Берн", "Люцерн", "Цуг", "Санкт-Галлен"], url: "/uk/guides" },
  branded: { count: 5, topics: ["Sweezy застосунок", "Sweezy для українців", "Sweezy Швейцарія", "відгуки Sweezy", "можливості Sweezy"], url: "/uk" },
};

const models = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Google AI"];

const frames = [
  (topic) => `Що потрібно знати українцю у Швейцарії про ${topic}?`,
  (topic) => `Дай покрокову інструкцію про ${topic} у Швейцарії для українців.`,
  (topic) => `Які актуальні правила у Швейцарії щодо теми: ${topic}?`,
  (topic) => `Які офіційні джерела і практичні кроки перевірити для: ${topic}?`,
];

const prompts = Object.entries(clusters).flatMap(([cluster, config]) => Array.from({ length: config.count }, (_, index) => ({
  id: `${cluster}-${String(index + 1).padStart(2, "0")}`,
  cluster,
  prompt: frames[Math.floor(index / config.topics.length) % frames.length](
    `${config.topics[index % config.topics.length]}${cluster === "status_s" ? " зі статусом S" : ""}`,
  ),
  expected_url: config.url,
})));

if (prompts.length !== 100) throw new Error(`Expected 100 prompts, got ${prompts.length}`);
if (new Set(prompts.map((item) => item.prompt)).size !== 100) throw new Error("Benchmark prompts must be unique");
for (const [cluster, config] of Object.entries(clusters)) {
  const count = prompts.filter((item) => item.cluster === cluster).length;
  if (count !== config.count) throw new Error(`${cluster}: expected ${config.count}, got ${count}`);
}

const header = "id,cluster,prompt,expected_url,model,date,cited,cited_url,position,competitor_domains,notes";
const rows = prompts.flatMap((item) => models.map((model) => [item.id,item.cluster,item.prompt,item.expected_url,model,"","","","","",""] .map((value)=>`"${String(value).replaceAll('"','""')}"`).join(",")));
const csv = `${header}\n${rows.join("\n")}\n`;
const outputArg = process.argv.find((argument) => argument.startsWith("--output="));

if (outputArg) {
  const outputPath = resolve(process.cwd(), outputArg.slice("--output=".length));
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, csv, "utf8");
  console.log(`AI citation benchmark sheet created: ${outputPath}`);
  console.log(`${prompts.length} prompts × ${models.length} systems = ${rows.length} evaluation rows.`);
} else if (process.argv.includes("--csv")) {
  process.stdout.write(csv);
} else {
  console.log(`AI citation benchmark valid: ${prompts.length} prompts across ${Object.keys(clusters).length} clusters.`);
  console.log(`${models.length} systems and ${rows.length} evaluation rows ready.`);
}
