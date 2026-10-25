import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // the site is one page now; the old URLs land on their section
  async redirects() {
    const to = (source: string, id: string) => ({ source, destination: `/#${id}`, permanent: false });
    return [
      to("/about", "about"),
      to("/journey", "journey"),
      to("/projects", "projects"),
      to("/life", "life"),
      to("/blog", "blog"),
      to("/contact", "contact"),
      to("/beyond-work", "life"),
      to("/workshop", "life"),
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
