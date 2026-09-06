export type AuthorityRouteStep = {
  key: "status-s" | "registration" | "work" | "insurance" | "community";
  title: string;
  description: string;
  href: string;
};

export const UKRAINIAN_AUTHORITY_ROUTE: AuthorityRouteStep[] = [
  {
    key: "status-s",
    title: "Статус S",
    description: "Права, строк дії, документи та офіційні оновлення.",
    href: "/uk/blog/status-s-shveytcariya-povnyy-gid",
  },
  {
    key: "registration",
    title: "Реєстрація",
    description: "Gemeinde, строки після приїзду й дозвіл на проживання.",
    href: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi",
  },
  {
    key: "work",
    title: "Робота",
    description: "Пошук вакансій, CV та правила працевлаштування.",
    href: "/uk/blog/poshuk-roboty-shveytcariya-2026",
  },
  {
    key: "insurance",
    title: "Страхування",
    description: "Базова страховка, франшиза, строки та субсидії.",
    href: "/uk/blog/medychne-strakhuvannya-shveytcariya",
  },
  {
    key: "community",
    title: "Спільнота",
    description: "Telegram і Facebook Sweezy для українців у Швейцарії.",
    href: "/uk/community",
  },
];

const OWNER_SLUGS = new Set([
  "status-s-shveytcariya-povnyy-gid",
  "yak-zareyestruvatysya-v-shveytcariyi",
  "poshuk-roboty-shveytcariya-2026",
  "medychne-strakhuvannya-shveytcariya",
]);

export function getUkrainianAuthorityRoute(locale: string, slug: string) {
  return locale === "uk" && OWNER_SLUGS.has(slug) ? UKRAINIAN_AUTHORITY_ROUTE : null;
}
