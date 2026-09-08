import { ImageResponse } from "next/og";
import { getPostBySlug, isLocale } from "../../../../lib/blog";
import { getPostArtwork } from "../../../../lib/editorial";

export const runtime = "nodejs";
export const alt = "Sweezy editorial guide cover";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const LOCALE_BADGES = { en: "EN", uk: "UA", de: "DE" } as const;

export default async function OpenGraphImage({ params }: { params: { locale: string; slug: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const post = await getPostBySlug(locale, params.slug);
  const title = post?.frontmatter.title ?? "Sweezy Switzerland Guide";
  const artwork = getPostArtwork(params.slug, locale);
  const fontSize = title.length > 78 ? 49 : title.length > 56 ? 57 : 66;

  return new ImageResponse(
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", overflow: "hidden", background: "#f1f2ed", color: "#0c0f0d", fontFamily: 'Arial, "Segoe UI", sans-serif' }}>
      <div style={{ display: "flex", width: 770, flexDirection: "column", justifyContent: "space-between", padding: "46px 52px 42px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 800 }}>
            <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: "#0c0f0d", color: artwork.accent, fontSize: 21 }}>S</div>
            <span>Sweezy</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 3 }}>{LOCALE_BADGES[locale]} / {artwork.issue}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 690 }}>
          <span style={{ marginBottom: 19, color: "#4c554e", fontSize: 16, fontWeight: 800, letterSpacing: 2.4, textTransform: "uppercase" }}>
            {artwork.label} · Switzerland
          </span>
          <div style={{ display: "flex", fontSize, fontWeight: 850, lineHeight: .96, letterSpacing: -2.9 }}>{title}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #0c0f0d", paddingTop: 17, fontSize: 17, fontWeight: 750 }}>
          <span>sweezy.world</span><span>Verified field guide ↗</span>
        </div>
      </div>

      <div style={{ position: "relative", width: 430, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderLeft: "2px solid #0c0f0d", background: artwork.soft }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 108, width: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 216, width: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 324, width: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 158, height: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 316, height: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 474, height: 1, display: "flex", background: "rgba(12,15,13,.22)" }} />
        <div style={{ position: "absolute", top: artwork.markerA, left: 42, width: 300, height: 300, display: "flex", border: "3px solid #0c0f0d", borderRadius: 999, transform: `rotate(${artwork.rotation}deg)` }} />
        <div style={{ position: "absolute", top: artwork.markerB, left: 92, width: 300, height: 300, display: "flex", border: `34px solid ${artwork.accent}`, borderRadius: 999 }} />
        <div style={{ position: "absolute", top: 112, right: -78, width: 290, height: 290, display: "flex", border: "2px solid #0c0f0d", transform: `rotate(${45 + artwork.rotation}deg)` }} />
        <div style={{ position: "absolute", bottom: 34, left: 34, display: "flex", color: "#0c0f0d", fontSize: 190, fontWeight: 900, lineHeight: .75, letterSpacing: -18, opacity: .9 }}>CH</div>
        <div style={{ position: "absolute", top: 38, right: 34, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, fontSize: 13, fontWeight: 800, letterSpacing: 2 }}><span>46.8182° N</span><span>8.2275° E</span></div>
        <div style={{ position: "absolute", bottom: 36, right: 32, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 99, background: artwork.accent, border: "2px solid #0c0f0d", fontSize: 11, fontWeight: 900 }}>{artwork.issue}</div>
      </div>
    </div>,
    size,
  );
}
