import RootLayoutHeader from "./_components/header";

export default function NonAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full">
      <RootLayoutHeader />
      <main>{children}</main>
    </div>
  );
}
