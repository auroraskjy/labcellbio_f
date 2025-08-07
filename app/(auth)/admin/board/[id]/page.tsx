import BoardForm from "@/components/board/board-form";
import { getBoardDetail } from "@/services/board/board";

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
