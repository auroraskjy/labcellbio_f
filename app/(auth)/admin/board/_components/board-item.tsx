"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateSimple } from "@/lib/utils";
import { GetBoardDTO } from "@/services/board/types";

import { PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeleteBoard } from "../_hooks/use-delete-board";

interface BoardItemProps {
  board: GetBoardDTO;
}

export default function BoardItem({ board }: BoardItemProps) {
  const { id, thumbnail, title, author, authorImage, createdAt } = board;

  const router = useRouter();

  const handleRowEdit = (id: number) => {
    router.push(`/admin/board/${id}`);
  };

  const { mutate: deleteBoard, isPending } = useDeleteBoard();

  const handleRowDelete = (id: number) => {
    deleteBoard(id);
  };

  const handleClickRow = (id: number) => {
    router.push(`/board/${id}`);
  };

  const handleButtonClick = (e: React.MouseEvent, handler: () => void) => {
    e.stopPropagation();
    handler();
  };

  return (
    <TableRow onClick={() => handleClickRow(id)}>
      <TableCell>
        <div className="w-20 h-15 rounded-lg overflow-hidden relative">
          <Image
            src={thumbnail}
            alt={"thumbnail"}
            fill
            className="object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="text-center">{title}</TableCell>
      <TableCell className="text-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={authorImage} />
          </Avatar>
          <span>{author}</span>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {formatDateSimple(createdAt)}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-50 hover:text-blue-600"
          onClick={(e) => handleButtonClick(e, () => handleRowEdit(id))}
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-50 hover:text-red-600"
          onClick={(e) => handleButtonClick(e, () => handleRowDelete(id))}
          disabled={isPending}
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
