import { FileTextIcon, ImageIcon } from "lucide-react";

export const SIDEBAR_MENU_ITEMS = [
  {
    icon: FileTextIcon,
    title: "게시글",
    subtitle: "게시글 관리",
    href: "/admin/board",
  },
  {
    icon: ImageIcon,
    title: "배너 이미지",
    subtitle: "배너 이미지 관리",
    href: "/admin/banner",
  },
];
