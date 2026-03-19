import { LocaleProvider } from "../../lib/locale-context";

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="de">{children}</LocaleProvider>;
}
