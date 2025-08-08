import BoardForm from "@/components/board/board-form";
import { getBoardDetail } from "@/services/board/board";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시글 수정",
  description: "게시글 수정 페이지입니다.",
};

interface AdminBoardEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBoardEditPage({
  params,
}: AdminBoardEditPageProps) {
  const { id } = await params;

  const board = await getBoardDetail(Number(id));

  return <BoardForm board={board} />;
}
