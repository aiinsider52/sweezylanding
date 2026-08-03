import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url), { status: 301 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "ClaudeBot",
    "PerplexityBot",
    "Googlebot",
    "bingbot",
  ].find((name) => userAgent.toLowerCase().includes(name.toLowerCase()));

  if (crawler) {
    console.info("[search-crawler]", JSON.stringify({
      crawler,
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    }));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
