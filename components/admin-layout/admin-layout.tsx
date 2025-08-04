"use client";

import { PropsWithChildren } from "react";

import AdminHeader from "@/components/admin-layout/admin-header";
import AdminSidebar from "@/components/admin-layout/admin-sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex relative w-full min-h-[100vh]">
      {/* sidebar */}
      <AdminSidebar />

      {/* content */}
      <div className="flex w-full flex-col">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
