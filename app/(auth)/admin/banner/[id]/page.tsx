import BannerForm from "@/components/banner/banner-form";
import { getBannerDetail } from "@/services/banner/banner";

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
