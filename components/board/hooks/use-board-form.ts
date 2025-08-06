import { useForm } from "react-hook-form";

import { CreateBoardRequest } from "@/services/board/types";
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

export function useBoardForm() {
  const methods = useForm<BoardFormType>({
    // resolver: zodResolver(schema),
    mode: "onChange",
  });

  return methods;
}

export type BoardFormValues = z.infer<typeof schema>;
