import { ImageResponse } from "next/og";
import { cantons, getCantonBySlug } from "../../../../data/cantons";
import type { Locale } from "../../../../lib/i18n";
import { isLocale } from "../../../../lib/blog";

export const runtime = "nodejs";
export const alt = "Sweezy Guides";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const LOCALE_BADGES = {
  en: "EN",
  uk: "UA",
  de: "DE",
} as const;

function getCantonName(locale: Locale, canton: (typeof cantons)[number]) {
  if (locale === "uk") return canton.nameUk;
  if (locale === "de") return canton.nameDe;
  return canton.name;
}

export default async function OpenGraphImage({
  params,
}: {
  params: { locale: string; canton: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const canton = getCantonBySlug(params.canton);
  const title = canton ? getCantonName(locale, canton) : "Swiss Canton Guide";
  const badge = LOCALE_BADGES[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0f14",
          color: "white",
          padding: "54px 64px 42px",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1.5,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)",
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex" }}>Sweezy</div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 40px",
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#7c6af7",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <div style={{ display: "flex" }}>sweezy.world</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 82,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "rgba(124,106,247,0.14)",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {badge}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
