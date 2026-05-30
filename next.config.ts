import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/mockups",
        destination: "/mockups/index.html",
        permanent: false,
      },
      {
        source: "/mockups/",
        destination: "/mockups/index.html",
        permanent: false,
      },
      {
        source: "/mockups/registration",
        destination: "/mockups/registration/index.html",
        permanent: false,
      },
      {
        source: "/mockups/registration/",
        destination: "/mockups/registration/index.html",
        permanent: false,
      },
      {
        source: "/mockups/badge",
        destination: "/mockups/badge/index.html",
        permanent: false,
      },
      {
        source: "/mockups/badge/",
        destination: "/mockups/badge/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
