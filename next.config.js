/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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
