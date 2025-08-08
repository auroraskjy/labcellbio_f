"use client";

import { BannerResponse } from "@/services/banner/types";
import { Controller, FormProvider } from "react-hook-form";

import FieldSet from "../field-set";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BannerFormValues, useBannerForm } from "./hooks/use-banner-form";
import { useBannerMutation } from "./hooks/use-banner-mutation";
import ImageUploadField from "./image-upload-field";

interface BannerFormProps {
  banner?: BannerResponse;
}

export default function BannerForm({ banner }: BannerFormProps) {
  const methods = useBannerForm(banner);
  const { handleSubmit, register, watch, setValue, control } = methods;
  const bannerMutation = useBannerMutation({
    bannerId: banner?.id,
  });

  const onSubmit = async (data: BannerFormValues) => {
    bannerMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-4 w-full rounded-xl bg-white p-6 space-y-4 shadow-md">
          <FieldSet label="배너 제목" isRequired>
            <Input
              {...register("title")}
              placeholder="배너 제목을 입력하세요"
            />
          </FieldSet>

          <FieldSet label="배너 부제목" isRequired>
            <Input
              {...register("subTitle")}
              placeholder="배너 부제목을 입력하세요"
            />
          </FieldSet>

          <div className="flex flex-col md:flex-row gap-6">
            <ImageUploadField
              label="배너 데스크톱 이미지"
              fieldName="bannerImage"
              setValue={setValue}
              watch={watch}
              isRequired
            />

            <ImageUploadField
              label="배너 모바일 이미지"
              fieldName="bannerMobileImage"
              setValue={setValue}
              watch={watch}
              isRequired
            />
          </div>

          <FieldSet label="배너 링크" isRequired>
            <Input placeholder="https://example.com" {...register("link")} />
          </FieldSet>

          <Controller
            control={control}
            name="targetBlank"
            render={({ field }) => (
              <div className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  id="targetBlank"
                  disabled={field.disabled}
                  name={field.name}
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
                <Label htmlFor="targetBlank" className="cursor-pointer">
                  새 탭으로 열기
                </Label>
              </div>
            )}
          />

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
