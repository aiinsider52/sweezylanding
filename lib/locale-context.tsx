"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translations, type Locale } from "./i18n";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

const VALID_LOCALES: Locale[] = ["en", "uk", "de"];

function getLocaleFromPath(path: string): Locale | null {
  if (path.startsWith("/uk")) return "uk";
  if (path.startsWith("/de")) return "de";
  if (path.startsWith("/en")) return "en";
  return null;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "en");
  const pathname = usePathname();

  /*
   * For the outer (root) LocaleProvider that has no initialLocale:
   * re-sync locale from the URL on every navigation so the footer
   * always reflects the current page's language.
   */
  useEffect(() => {
    if (initialLocale) return; // inner provider — locale comes from the route param

    // Priority 1: derive from current URL path
    const urlLocale = getLocaleFromPath(pathname ?? "");
    if (urlLocale) {
      setLocaleState(urlLocale);
      return;
    }

    // Priority 2: localStorage preference (for non-locale pages like /support)
    const stored = localStorage.getItem("sweezy-locale") as Locale | null;
    if (stored && VALID_LOCALES.includes(stored)) {
      setLocaleState(stored);
      return;
    }

    // Priority 3: browser language auto-detect
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("uk")) setLocaleState("uk");
    else if (lang.startsWith("de")) setLocaleState("de");
  }, [initialLocale, pathname]); // re-run on every navigation

  /* Sync <html lang=""> attribute */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("sweezy-locale", l);
  };

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[locale];
      for (const k of keys) {
        value = value?.[k];
      }
      return typeof value === "string" ? value : key;
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
