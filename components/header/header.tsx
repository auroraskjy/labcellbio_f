import LoginButton from "@/components/header/login-button";
import ProfileButton from "@/components/header/profile-button";
import { isLoggedIn } from "@/lib/auth/session";
import { cn } from "@/lib/tiptap-utils";
import Link from "next/link";

export default async function Header() {
  const loggedIn = await isLoggedIn();

  return (
    <header
      className={cn("border-b border-b-gray-200 h-[56px]")}
      role="banner"
      aria-label="사이트 헤더"
    >
      <div
        className={cn(
          "flex items-center max-w-[var(--container-width)] w-full h-full mx-auto p-[20px_40px] justify-between"
        )}
      >
        <h1 className={cn("text-[17px] font-bold")}>
          <Link href="/" aria-label="LABCELLBIO 홈페이지로 이동">
            LABCELLBIO
          </Link>
        </h1>

        <nav role="navigation" aria-label="사용자 계정 메뉴">
          {loggedIn ? <ProfileButton /> : <LoginButton />}
        </nav>
      </div>
    </header>
  );
}
