import Link from "next/link";

import { getAuthStatus, signout } from "@/actions/auth";

export default async function RootLayoutHeader() {
  const { loggedIn } = await getAuthStatus();

  return (
    <header className="h-13 md:h-17.5 w-full fixed top-0 left-0 z-50 bg-white border-b border-[#ddd]">
      <div className="w-full h-full mx-auto max-w-[var(--container-width)] flex items-center justify-between px-5">
        <Link href="/">
          <h1 className="text-2xl font-[600] text-[#012748]">LABCELLBIO</h1>
        </Link>

        {loggedIn ? (
          <div className="flex gap-4 items-center">
            <Link
              href="/admin/board"
              className="text-sm text-[#777] transition-colors duration-[250ms] ease-in-out hover:text-black font-[500]"
            >
              어드민
            </Link>

            <form action={signout}>
              <button
                type="submit"
                className="text-sm text-[#777] transition-colors duration-[250ms] ease-in-out hover:text-black font-[500] cursor-pointer"
              >
                로그아웃
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm text-[#777] transition-colors duration-[250ms] ease-in-out hover:text-black font-[500]"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
