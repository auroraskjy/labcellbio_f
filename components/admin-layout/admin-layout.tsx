"use client";

import { PropsWithChildren } from "react";

import AdminHeader from "@/components/admin-layout/admin-header";
import AdminSidebar from "@/components/admin-layout/admin-sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex relative w-full min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 bg-[#fafbfc] p-[14px] md:p-[21px] overflow-hidden">
          <div className="w-full h-full mx-auto max-w-[var(--admin-container-width)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
