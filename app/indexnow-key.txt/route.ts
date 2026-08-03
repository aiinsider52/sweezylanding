export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key || !/^[a-f0-9-]{8,128}$/i.test(key)) {
    return new Response("IndexNow key is not configured.", {
      status: 404,
      headers: { "cache-control": "no-store" },
    });
  }

  return new Response(key, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
}
