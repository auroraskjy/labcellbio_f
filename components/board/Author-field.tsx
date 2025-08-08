"use client";

import { useRef } from "react";

import InputGroup from "@/components/board/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getFilenameWithTimestamp } from "@/lib/utils";
import {
  getPresignedUrl,
  postCompleteUrl,
  uploadFileToS3,
} from "@/services/upload";
import { SquarePenIcon, UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import FieldSet from "../field-set";
import { BoardFormValues } from "./hooks/use-board-form";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function AuthorField() {
  const { register, setValue, watch } = useFormContext<BoardFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(2);
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum allowed (${maxMB} MB)`);
    }

    const { uploadUrl, fileUrl, s3Key } = await getPresignedUrl(file.name);

    await uploadFileToS3(uploadUrl, file);

    const extension = "." + file.name.split(".").at(-1);

    const filename = file.name.split(extension)[0];

    await postCompleteUrl({
      filename: getFilenameWithTimestamp(`${filename}${extension}`),
      originalName: file.name,
      contentType: file.type,
      fileSize: file.size,
      fileUrl,
      s3Key,
    });

    setValue("authorImage", fileUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <InputGroup
      label="작성자 정보"
      isRequired
      tooltipDesc="게시글 작성자의 이름과 프로필 이미지를 설정합니다.<br />프로필 이미지는 5MB 이하의 이미지 파일만 업로드 가능합니다."
    >
      <div className="border border-gray-200 p-4 rounded-lg flex items-center gap-2 bg-gray-50">
        {/* 숨겨진 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Avatar
          className="w-15 h-15 relative cursor-pointer group"
          onClick={handleAvatarClick}
        >
          <AvatarImage src={watch("authorImage") || undefined} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>

          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex justify-center items-center">
            <SquarePenIcon className="text-white" />
          </div>
        </Avatar>

        <FieldSet
          label="작성자명"
          tooltipDesc="게시글에 표시될 작성자의 이름입니다."
        >
          <Input placeholder="작성자명을 입력하세요" {...register("author")} />
        </FieldSet>
      </div>
    </InputGroup>
  );
}
