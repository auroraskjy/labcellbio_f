"use client";

import AuthorField from "@/components/board/Author-field";
import FieldSet from "@/components/board/field-set";
import ThumbnailPreview from "@/components/board/thumbnail-preview";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeIcon, UploadIcon } from "lucide-react";

import { FormProvider } from "react-hook-form";

import { createBoard } from "@/services/board/board";
import { ApiError } from "@/services/http-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BoardFormValues, useBoardForm } from "./hooks/use-board-form";

export default function BoardForm() {
  const methods = useBoardForm();

  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = methods;

  const onSubmit = async (data: BoardFormValues) => {
    const { boardImages: bi, ...rest } = data;

    const boardImages = !!bi
      ? bi.length > 0
        ? bi.map((image) => image.uploadId)
        : null
      : null;

    try {
      await createBoard({
        ...rest,
        boardImages,
      });

      router.replace("/admin/board");
    } catch (error) {
      if (error instanceof ApiError) {
        // 간단하게 토스트 띄우기
        error.showToasts((msg) => toast.error(msg));

        console.log("에러 정보:", error.data);
      } else {
        console.error("예상치 못한 에러:", error);
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // SimpleEditor 컴포넌트에 onUpdate prop 추가
  const handleEditorUpdate = (html: string) => {
    setValue("content", html, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleEditorImageAdd = (fileUrl: string, uploadId: number) => {
    const { getValues, setValue } = methods;

    // 기존 배열 가져오기
    const currentImages = getValues("boardImages") || [];

    // 새 이미지 추가
    setValue(
      "boardImages",
      [
        ...currentImages,
        {
          fileUrl,
          uploadId,
        },
      ],
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const handleEditorImageRemove = (fileUrlList: string[]) => {
    const { getValues, setValue } = methods;
    const currentImages = getValues("boardImages") || [];

    const updatedImages = currentImages.filter(
      (image) => !fileUrlList.includes(image.fileUrl)
    );

    setValue("boardImages", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col rounded-xl bg-white p-6 space-y-4">
          <div className="flex gap-2 items-center text-sm text-gray-700 font-medium">
            <UploadIcon className="!w-4 !h-4" />

            <h2 className="leading-none font-semibold">게시글 기본정보</h2>
          </div>

          <div className="w-full justify-between flex gap-4 flex-col md:flex-row">
            <FieldSet label="제목" isRequired>
              <Input placeholder="제목을 입력하세요" {...register("title")} />
            </FieldSet>

            <FieldSet label="설명">
              <Input
                placeholder="설명을 입력하세요"
                {...register("description")}
              />
            </FieldSet>
          </div>

          <div className="w-full justify-between flex gap-4 flex-col md:flex-row">
            <AuthorField />
            <ThumbnailPreview />
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col rounded-xl bg-white p-6 space-y-4">
          <div className="flex gap-2 items-center text-sm text-gray-700 font-medium">
            <CodeIcon className="!w-4 !h-4" />

            <h2 className="leading-none font-semibold">게시글 내용 (HTML)</h2>
          </div>

          <SimpleEditor
            onUpdate={handleEditorUpdate}
            onImageAdd={handleEditorImageAdd}
            handleEditorImageRemove={handleEditorImageRemove}
          />

          <div className="flex justify-end w-full">
            <Button type="submit">게시글 작성</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
