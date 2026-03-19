import { LocaleProvider } from "../../lib/locale-context";

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="uk">{children}</LocaleProvider>;
}
