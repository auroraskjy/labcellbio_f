"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();

  if (path !== "/") return;

  return (
    <footer className="p-[26px_13px] md:p-[40px_0px_50px_0px] bg-[#012748] mt-30 w-full">
      <div className="max-w-[1280px] w-full mx-auto px-5">
        <h2 className="text-xl md:text-2xl font-bold text-white">LABCELLBIO</h2>
      </div>
    </footer>
  );
}
