import { ImageResponse } from "next/og";
import { getPostsByLocale, isLocale } from "../../../lib/blog";

export const runtime = "nodejs";
export const alt = "Sweezy Switzerland guide library";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const COPY = {
  en: { title: "Switzerland guides for expats", label: "FIELD NOTES" },
  uk: { title: "Гіди для українців у Швейцарії", label: "ПРАКТИЧНІ МАТЕРІАЛИ" },
  de: { title: "Ratgeber für das Leben in der Schweiz", label: "SCHWEIZ-RATGEBER" },
} as const;

export default async function BlogOpenGraphImage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const posts = await getPostsByLocale(locale);
  const copy = COPY[locale];

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0c0f0d", color: "#f3f4ef", fontFamily: 'Arial, "Segoe UI", sans-serif' }}>
      <div style={{ width: 820, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "50px 58px 46px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 800 }}><div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, background: "#adff00", color: "#0c0f0d" }}>S</div>Sweezy</div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ marginBottom: 20, color: "#adff00", fontSize: 16, fontWeight: 800, letterSpacing: 3 }}>{copy.label}</span><div style={{ display: "flex", maxWidth: 720, fontSize: 70, fontWeight: 850, lineHeight: .95, letterSpacing: -3.6 }}>{copy.title}</div></div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.3)", paddingTop: 17, fontSize: 17 }}><span>sweezy.world</span><span>Switzerland · 2026</span></div>
      </div>
      <div style={{ position: "relative", width: 380, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", borderLeft: "1px solid rgba(255,255,255,.2)", background: "#82c8ff", color: "#0c0f0d", padding: "48px 42px" }}>
        <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: 3 }}>SWEEZY / KNOWLEDGE</span>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 190, fontWeight: 900, lineHeight: .72, letterSpacing: -14 }}>{posts.length}</span><span style={{ marginTop: 30, fontSize: 20, fontWeight: 800, letterSpacing: 1.5 }}>{copy.label}</span></div>
        <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0c0f0d", borderRadius: 99, fontSize: 22 }}>↗</div>
      </div>
    </div>,
    size,
  );
}
