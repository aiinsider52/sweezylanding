/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
