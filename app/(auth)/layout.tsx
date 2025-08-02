import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { isLoggedIn } from "@/lib/auth/session";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    redirect("/");
  }

  return <>{children}</>;
}
