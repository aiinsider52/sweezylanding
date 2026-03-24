import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const BASE_URL = "https://www.sweezy.world";

function normalizePath(pathWithoutLocale = "") {
  if (!pathWithoutLocale || pathWithoutLocale === "/") return "";
  return pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;
}

function localizedUrl(locale: Locale, pathWithoutLocale = "") {
  return `${BASE_URL}/${locale}${normalizePath(pathWithoutLocale)}`;
}

export function buildRootAlternates(): Metadata["alternates"] {
  return {
    languages: {
      en: localizedUrl("en"),
      uk: localizedUrl("uk"),
      de: localizedUrl("de"),
      "x-default": localizedUrl("en"),
    },
  };
}

export function buildLocaleAlternates(
  locale: Locale,
  pathWithoutLocale = "",
): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, pathWithoutLocale),
    languages: {
      en: localizedUrl("en", pathWithoutLocale),
      uk: localizedUrl("uk", pathWithoutLocale),
      de: localizedUrl("de", pathWithoutLocale),
      "x-default": localizedUrl("en", pathWithoutLocale),
    },
  };
}
