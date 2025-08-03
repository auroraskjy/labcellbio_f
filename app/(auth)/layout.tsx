import { ReactNode } from "react";

import { getAuthStatus } from "@/services/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { loggedIn } = await getAuthStatus();

  if (!loggedIn) {
    redirect("/");
  }

  return <>{children}</>;
}
