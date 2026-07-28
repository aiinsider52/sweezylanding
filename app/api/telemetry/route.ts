import { NextResponse } from "next/server";

const EVENT_TYPES = new Set(["web-vital", "client-error", "unhandled-rejection"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.slice(0, maxLength) : undefined;
}

function number(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  const fetchSite = request.headers.get("sec-fetch-site");

  if (contentLength > 4096) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  if (fetchSite && fetchSite !== "same-origin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = text(payload.type, 40);
  if (!type || !EVENT_TYPES.has(type)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const event = {
    source: "sweezy-client",
    type,
    name: text(payload.name, 80),
    message: text(payload.message, 300),
    path: text(payload.path, 200),
    id: text(payload.id, 120),
    rating: text(payload.rating, 24),
    navigationType: text(payload.navigationType, 40),
    value: number(payload.value),
    delta: number(payload.delta),
    timestamp: text(payload.timestamp, 40),
  };

  console.info("[client-telemetry]", JSON.stringify(event));
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}
