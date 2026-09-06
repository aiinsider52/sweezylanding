import type { Locale } from "../lib/i18n";

export type SeoCluster = { key: string; title: string; description: string; href: string };

export const SEO_CLUSTERS: Record<Locale, SeoCluster[]> = {
  en: [
    { key: "permits", title: "Permits and registration", description: "Registration, residence permits and first official steps.", href: "/en/blog/swiss-residence-permit-guide" },
    { key: "work", title: "Work in Switzerland", description: "Job search, work permits and application preparation.", href: "/en/blog/how-to-find-job-switzerland-foreigner" },
    { key: "tax", title: "Swiss taxes", description: "Tax returns, Quellensteuer, deadlines and filing decisions.", href: "/en/blog/swiss-tax-return-2026" },
    { key: "places", title: "Explore Switzerland", description: "Practical destination guides, routes and local planning.", href: "/en/places" },
  ],
  uk: [
    { key: "status-s", title: "Статус S у Швейцарії", description: "Права, продовження, робота, страхування та документи.", href: "/uk/blog/status-s-shveytcariya-povnyy-gid" },
    { key: "registration", title: "Реєстрація після переїзду", description: "Gemeinde, строки, потрібні документи та дозвіл на проживання.", href: "/uk/blog/yak-zareyestruvatysya-v-shveytcariyi" },
    { key: "work", title: "Робота у Швейцарії", description: "Пошук вакансій, резюме, дозволи та перевірені кроки.", href: "/uk/blog/poshuk-roboty-shveytcariya-2026" },
    { key: "insurance", title: "Медичне страхування", description: "Обов'язкова страховка, франшиза, субсидії та вибір каси.", href: "/uk/blog/medychne-strakhuvannya-shveytcariya" },
    { key: "community", title: "Спільнота Sweezy", description: "Telegram і Facebook для обміну досвідом між українцями у Швейцарії.", href: "/uk/community" },
    { key: "places", title: "Куди поїхати", description: "Гори, озера, міста та практичні маршрути Швейцарією.", href: "/uk/places" },
  ],
  de: [
    { key: "insurance", title: "Krankenversicherung", description: "Grundversicherung, Franchise und erste Schritte für Expats.", href: "/de/blog/krankenversicherung-expats-schweiz" },
    { key: "work", title: "Arbeiten in der Schweiz", description: "Kantonale Guides, Anmeldung und praktische Vorbereitung.", href: "/de/guides" },
    { key: "permits", title: "Anmeldung und Bewilligung", description: "Behörden, Dokumente und kantonale Abläufe.", href: "/de/guides/zurich" },
    { key: "places", title: "Schweiz entdecken", description: "Reiseziele, Routen und praktische Planung.", href: "/de/places" },
  ],
};
