import { ReactNode } from "react";
import RootLayoutHeader from "./_components/header";

export default function NonAuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <RootLayoutHeader />
      <main>{children}</main>
    </div>
  );
}
