import type { Locale } from "../lib/i18n";

export const DOWNLOAD_IDS = ["first-week", "travel-kit", "business-ch", "starter-germany", "business-germany", "starter-austria", "business-austria"] as const;
export type DownloadId = typeof DOWNLOAD_IDS[number];
export const DOWNLOADS: Record<DownloadId, { country: "switzerland" | "germany" | "austria"; title: Record<Locale, string>; description: Record<Locale, string> }> = {
  "first-week": { country: "switzerland", title: { uk: "Перший тиждень у Швейцарії", en: "Your first week in Switzerland", de: "Deine erste Woche in der Schweiz" }, description: { uk: "Документи, реєстрація та перші справи: короткий чек-лист для переїзду.", en: "Documents, registration and first tasks in a short moving checklist.", de: "Dokumente, Anmeldung und erste Aufgaben als kompakte Umzugscheckliste." } },
  "travel-kit": { country: "switzerland", title: { uk: "8 місць у Швейцарії", en: "8 places in Switzerland", de: "8 Orte in der Schweiz" }, description: { uk: "Ідеї поїздок, посилання на гіди та власний план подорожі.", en: "Trip ideas, links to place guides and your own travel planner.", de: "Ausflugsideen, Links zu Ortsguides und dein eigener Reiseplan." } },
  "business-ch": { country: "switzerland", title: { uk: "Свій бізнес у Швейцарії", en: "Starting a business in Switzerland", de: "Ein Unternehmen in der Schweiz gründen" }, description: { uk: "Питання про дозвіл, форму бізнесу, страхування й податки до першого замовлення.", en: "Permission, business structure, insurance and tax questions to resolve before your first order.", de: "Aufenthalt, Rechtsform, Versicherungen und Steuern vor dem ersten Auftrag klären." } },
  "starter-germany": { country: "germany", title: { uk: "Перші кроки в Німеччині", en: "Your first steps in Germany", de: "Deine ersten Schritte in Deutschland" }, description: { uk: "Anmeldung, право на проживання, страхування й підготовка до роботи.", en: "Anmeldung, residence rights, health coverage and preparing for work.", de: "Anmeldung, Aufenthaltsrecht, Krankenversicherung und Arbeitsvorbereitung." } },
  "business-germany": { country: "germany", title: { uk: "Свій бізнес у Німеччині", en: "Starting a business in Germany", de: "In Deutschland gründen" }, description: { uk: "Право на самозайнятість, Gewerbe чи вільна професія, податки та консультація.", en: "Self-employment permission, trade or freelance activity, taxes and startup advice.", de: "Erlaubnis zur Selbstständigkeit, Gewerbe oder freier Beruf, Steuern und Gründungsberatung." } },
  "starter-austria": { country: "austria", title: { uk: "Перші кроки в Австрії", en: "Your first steps in Austria", de: "Deine ersten Schritte in Österreich" }, description: { uk: "Meldezettel, документи про проживання, страхування й підготовка до роботи.", en: "Meldezettel, residence documents, insurance and preparing for work.", de: "Meldezettel, Aufenthaltsdokumente, Versicherung und Arbeitsvorbereitung." } },
  "business-austria": { country: "austria", title: { uk: "Свій бізнес в Австрії", en: "Starting a business in Austria", de: "In Österreich gründen" }, description: { uk: "Gewerbeanmeldung, кваліфікація, право на діяльність і соціальне страхування.", en: "Gewerbeanmeldung, qualifications, permission to operate and social insurance.", de: "Gewerbeanmeldung, Befähigung, Aufenthaltsrecht und Sozialversicherung." } },
};

export function isDownloadId(value: string): value is DownloadId { return DOWNLOAD_IDS.includes(value as DownloadId); }
export function downloadFilename(id: DownloadId, locale: Locale) {
  return `sweezy-${id === "first-week" ? "first-week" : id}-${locale}.pdf`;
}
export function downloadHref(id: DownloadId, locale: Locale, placement = "resources") {
  return `/api/download/${id}?locale=${locale}&placement=${encodeURIComponent(placement)}`;
}
