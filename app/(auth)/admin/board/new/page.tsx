import BoardForm from "@/components/board/board-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시글 작성",
  description: "게시글 작성 페이지입니다.",
};

export default function AdminBoardNewPage() {
  return <BoardForm />;
}
