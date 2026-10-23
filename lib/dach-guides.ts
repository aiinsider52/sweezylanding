import guides from "../data/dach-guides.json";
import type { Locale } from "./i18n";
import type { DachTopic } from "../data/dach";

export type DachGuide = { title: string; description: string; summary: string; appliesTo: string; sections: { title: string; body: string; checklist: string[] }[]; faq: { q: string; a: string }[] };
const content: Record<"germany" | "austria", Record<DachTopic, Record<Locale, DachGuide>>> = guides;
export function getDachGuide(country: "germany" | "austria", topic: DachTopic, locale: Locale): DachGuide { return content[country][topic][locale]; }
