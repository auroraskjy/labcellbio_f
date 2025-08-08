"use client";

import AuthorField from "@/components/board/Author-field";

import ThumbnailPreview from "@/components/board/thumbnail-preview";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeIcon, UploadIcon } from "lucide-react";

import { GetBoardDTO } from "@/services/board/types";
import { FormProvider } from "react-hook-form";

import FieldSet from "../field-set";
import { BoardFormValues, useBoardForm } from "./hooks/use-board-form";
import { useBoardMutation } from "./hooks/use-board-mutation";

interface BoardFormProps {
  board?: GetBoardDTO; // 수정 모드일 때 기존 게시글 데이터
}

export default function BoardForm({ board }: BoardFormProps) {
  const methods = useBoardForm(board); // 기본값으로 기존 데이터 전달
  const { handleSubmit } = methods;

  const boardMutation = useBoardMutation({
    boardId: board?.id,
  });

  const onSubmit = async (data: BoardFormValues) => {
    const { boardImages: bi, ...rest } = data;

    const boardImages = !!bi
      ? bi.length > 0
        ? bi.map((image) => image.uploadId)
        : null
      : null;

    boardMutation.mutate({
      ...rest,
      boardImages,
    });
  };

  // SimpleEditor 컴포넌트에 onUpdate prop 추가
  const handleEditorUpdate = (html: string) => {
    methods.setValue("content", html, {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col rounded-xl bg-white p-6 space-y-4">
          <div className="flex gap-2 items-center text-sm text-gray-700 font-medium">
            <UploadIcon className="!w-4 !h-4" />

            <h2 className="leading-none font-semibold">게시글 기본정보</h2>
          </div>

          <div className="w-full justify-between flex gap-4 flex-col md:flex-row">
            <FieldSet
              label="제목"
              isRequired
              tooltipDesc={`게시글의 제목으로 사용되며,<br />검색 엔진 최적화(SEO)를 위한 메타태그 title에도 사용됩니다.<br />명확하고 구체적인 제목을 작성해주세요.`}
            >
              <Input
                placeholder="제목을 입력하세요"
                {...methods.register("title")}
              />
            </FieldSet>

            <FieldSet
              label="설명"
              tooltipDesc={`게시글의 간단한 요약 설명입니다.<br />검색 결과나 소셜 미디어 공유 시 미리보기로 표시되며,<br />150자 이내로 작성하는 것이 좋습니다.`}
            >
              <Input
                placeholder="설명을 입력하세요"
                {...methods.register("description")}
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
            content={board?.content} // 수정 모드일 때 기존 HTML 내용
            onUpdate={handleEditorUpdate}
            onImageAdd={handleEditorImageAdd}
            handleEditorImageRemove={handleEditorImageRemove}
          />

          <div className="flex justify-end w-full">
            <Button
              type="submit"
              loading={boardMutation.isPending}
              disabled={boardMutation.isPending}
            >
              {board ? "게시글 수정" : "게시글 작성"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
