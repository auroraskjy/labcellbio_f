"use client";

import { ArrowLeftIcon, HouseIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-between w-full h-[60px] border-b border-[#eee]">
      <div onClick={handleBack} className="cursor-pointer">
        <ArrowLeftIcon strokeWidth={1.5} />
      </div>

      <Link href="/">
        <HouseIcon strokeWidth={1.5} />
      </Link>
    </div>
  );
}
