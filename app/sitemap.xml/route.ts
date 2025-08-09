import { getBoardList } from "@/services/board/board";
import type { GetBoardDTO, GetBoardResponse } from "@/services/board/types";
import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";

// ISR: 1시간마다 재검증
export const revalidate = 3600;

const RAW_BASE = process.env.NEXT_PUBLIC_BASE_URL;
if (!RAW_BASE) {
  throw new Error("NEXT_PUBLIC_BASE_URL is missing for sitemap generation");
}
const BASE_URL = RAW_BASE.replace(/\/+$/, "");
const PER_PAGE = 100;

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toIsoOrNow = (v?: string | Date) => {
  if (!v) return new Date().toISOString();
  const t = new Date(v);
  return isNaN(t.getTime()) ? new Date().toISOString() : t.toISOString();
};

export async function GET() {
  const staticURLs: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      priority: 0.8,
      changeFrequency: "weekly",
    },
  ];

  let dynamicURLs: MetadataRoute.Sitemap = [];

  try {
    const first: GetBoardResponse = await getBoardList({
      page: 1,
      pageSize: PER_PAGE,
    });

    const total = first.total ?? first.boards.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

    let restBoards: GetBoardDTO[] = [];
    if (totalPages > 1) {
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
      const results = await Promise.all(
        pages.map(
          (page) =>
            getBoardList({
              page,
              pageSize: PER_PAGE,
            }) as Promise<GetBoardResponse>
        )
      );
      restBoards = results.flatMap((r) => r.boards ?? []);
    }

    const allBoards: GetBoardDTO[] = [...(first.boards ?? []), ...restBoards];

    // 최신순 정렬
    allBoards.sort((a, b) => {
      const la = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();
      const lb = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();
      return lb - la;
    });

    dynamicURLs = allBoards.map((p) => ({
      url: `${BASE_URL}/board/${p.id}`,
      lastModified: toIsoOrNow(p.updatedAt ?? p.createdAt),
      priority: 1,
      changeFrequency: "daily",
    }));
  } catch (error) {
    console.error("Failed to fetch board list for sitemap:", error);
  }

  // XML 변환 시에는 속성명을 sitemap XML 형식에 맞게 변환
  const urlsXml = [...staticURLs, ...dynamicURLs]
    .map(
      (u) => `
  <url>
    <loc>${xmlEscape(u.url)}</loc>
    <lastmod>${u.lastModified}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
