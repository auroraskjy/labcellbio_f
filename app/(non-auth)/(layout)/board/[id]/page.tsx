import { getAuthStatus } from "@/actions/auth";
import { formatDateSimple } from "@/lib/utils";
import { getSingleBoard } from "@/services/board/board";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GetEditorContent from "./_components/get-editor-content";

interface BoardDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BoardDetailProps): Promise<Metadata> {
  // params를 await로 기다림
  const { id } = await params;
  const boardId = parseInt(id);

  if (isNaN(boardId)) {
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }

  try {
    const board = await getSingleBoard(boardId);

    return {
      title: board.title,
      description:
        board.description ||
        board.content.substring(0, 160).replace(/<[^>]*>/g, ""), // HTML 태그 제거
      openGraph: {
        title: board.title,
        description:
          board.description ||
          board.content.substring(0, 160).replace(/<[^>]*>/g, ""),
        images: board.thumbnail ? [{ url: board.thumbnail }] : [],
        type: "article",
        authors: [board.author],
        publishedTime: board.createdAt,
        modifiedTime: board.updatedAt,
      },
      twitter: {
        card: "summary_large_image",
        title: board.title,
        description:
          board.description ||
          board.content.substring(0, 160).replace(/<[^>]*>/g, ""),
        images: board.thumbnail ? [board.thumbnail] : [],
        creator: board.author,
      },
      authors: [{ name: board.author }],
    };
  } catch (error) {
    console.error("메타데이터 생성 오류:", error);
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  // params를 await로 기다림
  const { id } = await params;
  const boardId = parseInt(id);

  if (isNaN(boardId)) {
    notFound();
  }

  try {
    const [board, authStatus] = await Promise.all([
      getSingleBoard(boardId),
      getAuthStatus(),
    ]);

    return (
      <div className="max-w-[640px] px-[20px] mx-auto flex flex-col pb-10">
        <div className="text-gray-900 text-xl md:text-4xl font-bold mb-4 md:mb-6">
          {board.title}
        </div>

        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative">
              <Image
                src={board.authorImage}
                alt={board.author}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base md:text-[18px] font-medium">
                {board.author}
              </span>
              <span className="text-xs md:text-sm font-normal">
                {formatDateSimple(board.createdAt)}
              </span>
            </div>
          </div>

          {authStatus.loggedIn && (
            <Link
              href={`/admin/board/${boardId}`}
              className="text-sm text-[#777] transition-colors duration-[250ms] ease-in-out hover:text-black font-[500]"
            >
              수정
            </Link>
          )}
        </div>

        <GetEditorContent html={board.content} />
      </div>
    );
  } catch (error) {
    console.error("게시글 조회 오류:", error);
    notFound();
  }
}
