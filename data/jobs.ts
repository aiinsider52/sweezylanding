import type { Locale } from "../lib/i18n";

export type JobListing = {
  slug: string;
  company: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  city: string;
  canton: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY" | "INTERN";
  workplace: "onsite" | "hybrid" | "remote";
  languages: string[];
  applicationUrl: string;
  publishedAt: string;
  validThrough: string;
};

// Only reviewed, active vacancies belong here. Never publish raw form submissions.
export const jobs: JobListing[] = [];

