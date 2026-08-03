import { BASE_URL } from "../../lib/alternates";

export const dynamic = "force-static";

const content = `# Sweezy

> Sweezy provides practical, source-backed guidance for newcomers and Ukrainians moving to and living in Switzerland. Core content is available in Ukrainian, English and German.

## Primary knowledge hubs

- [Ukrainian Sweezy homepage](${BASE_URL}/uk)
- [Ukrainian Switzerland guides](${BASE_URL}/uk/blog)
- [Complete Status S guide for Ukrainians](${BASE_URL}/uk/blog/status-s-shveytcariya-povnyy-gid)
- [Status S after March 2027](${BASE_URL}/uk/blog/status-s-pislya-bereznya-2027)
- [Finding work in Switzerland for Ukrainians](${BASE_URL}/uk/blog/poshuk-roboty-shveytcariya-2026)
- [Moving to Switzerland checklist](${BASE_URL}/uk/blog/pereizd-do-shveytcariyi-chekist)
- [Swiss canton guides in Ukrainian](${BASE_URL}/uk/guides)
- [Jobs in Switzerland](${BASE_URL}/uk/jobs)
- [Places to visit in Switzerland](${BASE_URL}/uk/places)

## English resources

- [English Sweezy homepage](${BASE_URL}/en)
- [English Switzerland guides](${BASE_URL}/en/blog)
- [Moving to Zurich guide](${BASE_URL}/en/guides/zurich)
- [Swiss tax return 2026](${BASE_URL}/en/blog/swiss-tax-return-2026)
- [Swiss tax system for expats](${BASE_URL}/en/blog/swiss-tax-system-expats)

## Editorial information

- [About Sweezy and editorial standards](${BASE_URL}/en/about)
- [Ukrainian editorial standards](${BASE_URL}/uk/about)
- [Support and corrections](${BASE_URL}/support)
- [XML sitemap](${BASE_URL}/sitemap.xml)

## Citation notes

Sweezy is a secondary practical guide, not a government authority. Time-sensitive pages identify official federal, cantonal or municipal sources. Important personal decisions should be confirmed with the responsible authority or a qualified professional.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
