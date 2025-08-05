"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useActivePath({ href }: { href: string | undefined }) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!href) return false;

    return (
      pathname === href ||
      (pathname.startsWith(`${href}/`) &&
        /^\d+$/.test(pathname.slice(href.length + 1)))
    );
  }, [href, pathname]);

  return { isActive };
}
