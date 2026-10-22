import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { identifyCrawler } from "./lib/discovery";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url), { status: 301 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = identifyCrawler(userAgent);

  if (crawler) {
    console.info("[search-crawler]", JSON.stringify({
      crawler: crawler.agent,
      purpose: crawler.purpose,
      identityVerified: false,
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    }));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
