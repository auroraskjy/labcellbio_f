import "./globals.css";

import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/tiptap-utils";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

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
