import { LocaleProvider } from "../../lib/locale-context";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="en">{children}</LocaleProvider>;
}
