"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useActivePath({ href }: { href: string | undefined }) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!href) return false;

    // 1) 정확히 일치
    if (pathname === href) {
      return true;
    }

    // 2) href 뒤에 슬래시+문자로 시작하면 (숫자·문자·혼합 모두)
    if (pathname.startsWith(`${href}/`)) {
      // 첫 번째 세그먼트만 추출
      const nextSegment = pathname.slice(href.length + 1).split("/")[0];
      return nextSegment.length > 0;
    }

    return false;
  }, [href, pathname]);

  return { isActive };
}
