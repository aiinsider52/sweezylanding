import type { Locale } from "../../lib/i18n";
import { publicDownloadHref, downloadFilename, type DownloadId } from "../../data/downloads";

export function DownloadLink({ asset, locale, placement, className, children }: { asset: DownloadId; locale: Locale; placement: string; className?: string; children: React.ReactNode }) {
  return <a href={publicDownloadHref(asset, locale)} download={downloadFilename(asset, locale)} data-download={asset} data-locale={locale} data-placement={placement} className={className}>{children}</a>;
}
