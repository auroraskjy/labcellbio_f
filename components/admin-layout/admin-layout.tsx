"use client";

import { PropsWithChildren } from "react";

import AdminHeader from "@/components/admin-layout/admin-header";
import AdminSidebar from "@/components/admin-layout/admin-sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex relative w-full min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 min-h-screen bg-[#fafbfc] h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
