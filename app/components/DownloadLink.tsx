import type { Locale } from "../../lib/i18n";
import { downloadHref, downloadFilename, type DownloadId } from "../../data/downloads";

export function DownloadLink({ asset, locale, placement, className, children }: { asset: DownloadId; locale: Locale; placement: string; className?: string; children: React.ReactNode }) {
  return <a href={downloadHref(asset, locale, placement)} download={downloadFilename(asset, locale)} data-download={asset} data-placement={placement} className={className}>{children}</a>;
}
