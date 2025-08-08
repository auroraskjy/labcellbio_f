import BannerForm from "@/components/banner/banner-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "배너 추가",
  description: "배너 추가 페이지입니다.",
};

export default function CreateBannerPage() {
  return <BannerForm />;
}
