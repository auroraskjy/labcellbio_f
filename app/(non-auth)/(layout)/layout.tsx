import { ReactNode } from "react";
import Footer from "./_components/footer";
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
      <Footer />
    </div>
  );
}
