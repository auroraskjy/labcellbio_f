import { ReactNode } from "react";
import Footer from "./_components/footer";
import RootLayoutHeader from "./_components/header";

export default function NonAuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative w-full">
      <RootLayoutHeader />
      <main className="pt-13 md:pt-17.5">{children}</main>
      <Footer />
    </div>
  );
}
