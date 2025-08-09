import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: "Yeti",
        allow: ["/", "/board/*"],
        disallow: ["/admin/", "/login"],
        crawlDelay: 1,
      },
      {
        userAgent: "*",
        allow: ["/", "/board/*"],
        disallow: ["/admin/", "/login"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
