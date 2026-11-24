import { NextResponse } from "next/server";
import { checkoutConfig, checkoutSessionParams, normaliseCart } from "../../../../lib/shop-checkout";
import { isLocale } from "../../../../lib/blog";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const config = checkoutConfig();
  if (!config.enabled) return NextResponse.json({ error: "checkout_disabled" }, { status: 503 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const { items, locale } = (payload ?? {}) as { items?: unknown; locale?: unknown };
  if (typeof locale !== "string" || !isLocale(locale)) return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  const lines = normaliseCart(items);
  if (!lines.length) return NextResponse.json({ error: "empty_cart" }, { status: 400 });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: checkoutSessionParams(lines, locale, config),
    cache: "no-store",
  });
  const session = (await response.json().catch(() => null)) as { url?: string; error?: { message?: string } } | null;
  if (!response.ok || !session?.url) {
    console.error("[shop-checkout]", response.status, session?.error?.message ?? "no session url");
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
