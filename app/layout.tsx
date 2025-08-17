import "./globals.css";

import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/tiptap-utils";
import { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "LABCELLBIO",
  /**
   * 구글, 네이버 등에서 검색했을 때 제목 아래 회색 텍스트로 표시되는 부분
   * 카카오톡, 페이스북, 트위터 등에 링크 공유시 미리보기 설명으로 표시
   */
  description: "LABCELLBIO는 건강을 연구합니다",
  // 검색 엔진이 사이트를 색인화할 때 참고하는 키워드들
  keywords: ["LABCELLBIO", "세포생물학", "연구실", "바이오", "생명과학"],
  authors: [{ name: "LABCELLBIO" }],
  creator: "LABCELLBIO",
  publisher: "LABCELLBIO",
  // Open Graph: 페이스북, 카카오톡, 슬랙 등에서 링크 공유시 표시되는 카드 정보
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "LABCELLBIO",
    title: "LABCELLBIO",
    description: "LABCELLBIO는 건강을 연구합니다",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LABCELLBIO 로고",
      },
    ],
  },
  // Twitter: 트위터(X)에서 링크 공유시 표시되는 카드 정보
  twitter: {
    card: "summary_large_image",
    site: "@LABCELLBIO",
    creator: "@LABCELLBIO",
    title: "LABCELLBIO",
    description: "LABCELLBIO는 건강을 연구합니다",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google-search-console 에서 발급받아서 코드 넣어주면됨
    google: "your-google-verification-code",
  },
  other: {
    // 네이버 서치어드바이저에서 발급받아서 코드 넣어주면됨
    "naver-site-verification": "1afefa469a8442d9899dc86903bded251364341f",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}
      suppressHydrationWarning
    >
      <body
        className={cn(pretendard.className, "antialiased")}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster expand closeButton />
      </body>
    </html>
  );
}
