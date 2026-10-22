import { readFile } from "node:fs/promises";
import { join } from "node:path";

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/NotoSans-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/NotoSans-Bold.ttf")),
  ]);
  return [
    { name: "Noto Sans", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

// ImageResponse's default Latin font cannot render Ukrainian. Bundle Cyrillic
// locally so preview generation also works without outbound font requests.
let fonts: ReturnType<typeof loadFonts> | undefined;
export function getSocialFonts() {
  return (fonts ??= loadFonts());
}
