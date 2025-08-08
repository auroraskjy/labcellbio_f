import { Metadata } from "next";
import BoardList from "./_components/board-list";
import HomeBanner from "./_components/home-banner";

export const metadata: Metadata = {
  title: "LABCELLBIO",
  description: "LABCELLBIO의 아이템을 만나보세요!",
};

export default async function Home() {
  return (
    <div className="flex flex-col gap-15 md:gap-20">
      <HomeBanner />
      <BoardList />
    </div>
  );
}
