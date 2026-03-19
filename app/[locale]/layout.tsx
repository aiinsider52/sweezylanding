import { notFound } from "next/navigation";
import { LocaleProvider } from "../../lib/locale-context";
import { isLocale } from "../../lib/blog";

export default function LocaleBlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  return <LocaleProvider initialLocale={params.locale}>{children}</LocaleProvider>;
}

