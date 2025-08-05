import { ReactNode } from "react";

import AdminLayout from "@/components/admin-layout/admin-layout";

import { getAuthStatus } from "@/actions/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { loggedIn } = await getAuthStatus();

  if (!loggedIn) {
    redirect("/");
  }

  return (
    <AdminLayout>
      <main className="w-full bg-[#fafbfc] h-full">{children}</main>
    </AdminLayout>
  );
}
