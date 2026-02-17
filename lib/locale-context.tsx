"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Locale } from "./i18n";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  /* Read persisted locale on mount & detect browser language */
  useEffect(() => {
    const stored = localStorage.getItem("sweezy-locale") as Locale | null;
    if (stored && (["en", "uk", "de"] as Locale[]).includes(stored)) {
      setLocaleState(stored);
      return;
    }
    // Auto-detect browser language
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("uk")) setLocaleState("uk");
    else if (lang.startsWith("de")) setLocaleState("de");
  }, []);

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
