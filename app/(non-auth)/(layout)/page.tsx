import BoardList from "./_components/board-list";
import HomeBanner from "./_components/home-banner";

export default async function Home() {
  return (
    <div className="flex flex-col gap-15 md:gap-20">
      <HomeBanner />
      <BoardList />
    </div>
  );
}
