import BannerForm from "@/components/banner/banner-form";
import { getBannerDetail } from "@/services/banner/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "배너 수정",
  description: "배너 수정 페이지입니다.",
};

interface AdminBannerEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBannerEditPage({
  params,
}: AdminBannerEditPageProps) {
  const { id } = await params;

  const banner = await getBannerDetail(Number(id));

  return <BannerForm banner={banner} />;
}
