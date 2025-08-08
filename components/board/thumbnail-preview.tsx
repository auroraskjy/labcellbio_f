"use client";

import { useRef } from "react";

import InputGroup from "@/components/board/input-group";
import { getFilenameWithTimestamp } from "@/lib/utils";
import {
  getPresignedUrl,
  postCompleteUrl,
  uploadFileToS3,
} from "@/services/upload";
import { ImageIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { BoardFormValues } from "./hooks/use-board-form";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ThumbnailPreview() {
  const { setValue, watch } = useFormContext<BoardFormValues>();
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

    setValue("thumbnail", fileUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const thumbnailUrl = watch("thumbnail");

  return (
    <InputGroup
      label="썸네일"
      isRequired
      tooltipDesc="게시글 목록에서 표시될 대표 이미지입니다.<br />소셜 미디어 공유 및 SEO를 위한 og:image 메타태그에도 사용됩니다.<br />16:9 비율의 이미지를 권장하며, 5MB 이하의 이미지 파일만 업로드 가능합니다."
    >
      <div
        className="bg-muted rounded-lg max-w-50 h-40 flex justify-center items-center relative overflow-hidden cursor-pointer group"
        onClick={handleAvatarClick}
      >
        {/* 숨겨진 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <ImageIcon />

        {thumbnailUrl && (
          <>
            <Image
              src={thumbnailUrl}
              alt="thumbnail"
              fill
              style={{
                objectFit: "cover",
              }}
            />

            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex justify-center items-center">
              <SquarePenIcon className="text-white" />
            </div>
          </>
        )}
      </div>
    </InputGroup>
  );
}
