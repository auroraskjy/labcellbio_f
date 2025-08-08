import { Metadata } from "next";
import BannerList from "./_components/banner-list";

export const metadata: Metadata = {
  title: "배너 관리",
  description: "배너 관리 페이지입니다.",
};

export default async function BannerPage() {
  return <BannerList />;
}
