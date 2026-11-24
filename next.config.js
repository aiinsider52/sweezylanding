/** @type {import('next').NextConfig} */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://checkout.stripe.com\")" },
];

// Public images keep stable names, so cache for a day and revalidate in the background for a week.
const ASSET_CACHE = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];

const nextConfig = {
  images: {
    // Optimised variants are cheap to keep; a revised source image appears within a week at most.
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      ...["shop", "brand", "destinations", "editorial", "images", "app-frames", "cinematic", "screenshots", "fonts"].map((dir) => ({ source: `/${dir}/:path*`, headers: ASSET_CACHE })),
    ];
  },
  experimental: {
    outputFileTracingExcludes: { "/**": ["./private/shop/**/*"] },
    // Keep Cyrillic fonts with Node image routes in traced deployments.
    outputFileTracingIncludes: {
      "/**/opengraph-image": ["./public/fonts/NotoSans-*.ttf", "./public/editorial/posts/social/*.jpg"],
      "/**/twitter-image": ["./public/fonts/NotoSans-*.ttf", "./public/editorial/posts/social/*.jpg"],
      "/api/download/**": ["./public/downloads/*.pdf"],
    },
  },
  async redirects() {
    return [
      {
        source: "/cookie-policy",
        destination: "/cookies",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/en/blog/moving-to-zurich-guide",
        destination: "/en/guides/zurich",
        permanent: true,
      },
      {
        source: "/uk/blog/poshuk-roboty-u-shveytcariyi",
        destination: "/uk/blog/poshuk-roboty-shveytcariya-2026",
        permanent: true,
      },
      {
        source: "/uk/blog/status-s-shveytcariya-2026",
        destination: "/uk/blog/status-s-shveytcariya-povnyy-gid",
        permanent: true,
      },
      {
        source: "/de/blog/krankenversicherung-schweiz-expats",
        destination: "/de/blog/krankenversicherung-expats-schweiz",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
