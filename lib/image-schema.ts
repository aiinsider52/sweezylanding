import type { Locale } from "./i18n";
import { BASE_URL } from "./alternates";

export function imageObject(src: string, caption: string, locale: Locale) {
  const url = src.startsWith("/") ? `${BASE_URL}${src}` : src;
  return { "@type": "ImageObject", url, contentUrl: url, caption, inLanguage: locale };
}
