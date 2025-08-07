"use client";

import { getFilenameWithTimestamp } from "@/lib/utils";
import { BannerResponse } from "@/services/banner/types";
import {
  getPresignedUrl,
  postCompleteUrl,
  uploadFileToS3,
} from "@/services/upload";
import { ImageIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import FieldSet from "../board/field-set";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import BannerWrapper from "./banner-wrapper";
import { BannerFormValues, useBannerForm } from "./hooks/use-banner-form";
import { useBannerMutation } from "./hooks/use-banner-mutation";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface BannerFormProps {
  banner?: BannerResponse; // 수정 모드일 때 기존 배너 데이터
}

export default function BannerForm({ banner }: BannerFormProps) {
  const methods = useBannerForm(banner); // 기본값으로 기존 데이터 전달
  const { handleSubmit, register, watch, setValue } = methods;

  const bannerMutation = useBannerMutation({
    bannerId: banner?.id,
  });

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

    setValue("bannerImage", fileUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const bannerImage = watch("bannerImage");

  const onSubmit = async (data: BannerFormValues) => {
    const { bannerImage, subTitle, title } = data;

    bannerMutation.mutate({
      title,
      subTitle,
      bannerImage,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 space-y-4 shadow-md">
          <div className="flex md:flex-row flex-col gap-4">
            <FieldSet label="타이틀" isRequired>
              <Input {...register("title")} />
            </FieldSet>

            <FieldSet label="서브 타이틀" isRequired>
              <Input {...register("subTitle")} />
            </FieldSet>
          </div>

          <FieldSet label="배너 이미지" isRequired>
            <BannerWrapper
              className="rounded-2xl bg-gray-100 flex items-center justify-center cursor-pointer group relative overflow-hidden"
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

              {bannerImage && (
                <>
                  <Image
                    src={bannerImage}
                    alt="bannerImage"
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
            </BannerWrapper>
          </FieldSet>

          <div className="flex justify-end w-full">
            <Button
              type="submit"
              loading={bannerMutation.isPending}
              disabled={bannerMutation.isPending}
            >
              {banner ? "배너 수정" : "배너 생성"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
