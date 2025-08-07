"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { BannerResponse } from "@/services/banner/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeleteBanner } from "../_hooks/use-delete-banner";

interface BannerItemProps {
  banner: BannerResponse;
}

export default function BannerItem({ banner }: BannerItemProps) {
  const { id, title, subTitle, upload } = banner;

  const router = useRouter();
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRowEdit = (id: number) => {
    router.push(`/admin/banner/${id}`);
  };

  const handleRowDelete = (id: number) => {
    deleteBanner(id);
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="w-4 h-4" />
        </Button>
      </TableCell>
      <TableCell>
        <div className="w-20 h-15 rounded-lg overflow-hidden relative">
          <Image
            src={upload?.fileUrl || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="text-center">{title}</TableCell>
      <TableCell className="text-center">{subTitle}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-50 hover:text-blue-600"
          onClick={() => handleRowEdit(id)}
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-50 hover:text-red-600"
          onClick={() => handleRowDelete(id)}
          disabled={isDeleting}
        >
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
