import { ImageResponse } from "next/og";
import { getPostBySlug, isLocale } from "../../../../lib/blog";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 600,
};

const LOCALE_BADGES = {
  en: "EN",
  uk: "UA",
  de: "DE",
} as const;

export default async function TwitterImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const post = await getPostBySlug(locale, params.slug);
  const title = post?.frontmatter.title ?? "Sweezy Blog";
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
          padding: "50px 60px 38px",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: -1.2,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
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
            padding: "0 36px",
            fontSize: 60,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: -1.8,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              fontSize: 26,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <div style={{ display: "flex" }}>sweezy.world</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 78,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "rgba(124,106,247,0.14)",
                fontSize: 19,
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

