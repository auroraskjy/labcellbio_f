import { useForm } from "react-hook-form";

import { CreateBoardRequest, GetBoardDTO } from "@/services/board/types";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  author: z.string().min(1),
  authorImage: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  thumbnail: z.string().min(1),
  boardImages: z.array(
    z.object({
      fileUrl: z.string(),
      uploadId: z.number(),
    })
  ),
});

interface BoardFormType extends Omit<CreateBoardRequest, "boardImages"> {
  boardImages: {
    fileUrl: string;
    uploadId: number;
  }[];
}

export function useBoardForm(board?: GetBoardDTO) {
  const methods = useForm<BoardFormType>({
    // resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      author: board?.author,
      authorImage: board?.authorImage,
      title: board?.title,
      description: board?.description,
      thumbnail: board?.thumbnail,
      content: board?.content,
      boardImages: board?.boardImages.map((image) => ({
        fileUrl: image.fileUrl,
        uploadId: image.id,
      })),
    },
  });

  return methods;
}

export type BoardFormValues = z.infer<typeof schema>;
