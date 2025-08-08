"use client";

import { getFilenameWithTimestamp } from "@/lib/utils";
import {
  getPresignedUrl,
  postCompleteUrl,
  uploadFileToS3,
} from "@/services/upload";
import { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

import { ImageIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import FieldSet from "../field-set";
import { BannerFormValues } from "./hooks/use-banner-form";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ImageUploadFieldProps {
  label: string;
  fieldName: "bannerImage" | "bannerMobileImage";
  setValue: UseFormSetValue<BannerFormValues>;
  watch: UseFormWatch<BannerFormValues>;
  isRequired?: boolean;
  tooltipDesc?: string;
}

export default function ImageUploadField({
  label,
  fieldName,
  setValue,
  watch,
  isRequired = false,
  tooltipDesc,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageValue = watch(fieldName);

  const handleClick = () => {
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

    setValue(fieldName, fileUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FieldSet
      label={label}
      isRequired={isRequired}
      tooltipDesc={tooltipDesc}
      onClick={handleClick}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="border border-input w-full aspect-[3/1] rounded-xl relative overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer">
        {imageValue ? (
          <>
            <Image
              src={imageValue}
              alt={fieldName}
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex justify-center items-center">
              <SquarePenIcon className="text-white" />
            </div>
          </>
        ) : (
          <ImageIcon />
        )}
      </div>
    </FieldSet>
  );
}
