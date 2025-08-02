import LoginButton from "@/components/header/login-button";
import ProfileButton from "@/components/header/profile-button";
import { isLoggedIn } from "@/lib/auth/session";
import { cn } from "@/lib/tiptap-utils";

export default async function Header() {
  const loggedIn = await isLoggedIn();

  return (
    <>
      <header className={cn("border-b border-b-gray-200 h-[56px]")}>
        <div
          className={cn(
            "flex items-center max-w-[var(--container-width)] w-full h-full mx-auto p-[20px_40px] justify-between"
          )}
        >
          <p className={cn("text-[17px] font-bold")}>LABCELLBIO</p>

          {loggedIn ? <ProfileButton /> : <LoginButton />}
        </div>
      </header>
    </>
  );
}
