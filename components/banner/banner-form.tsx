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
          <FieldSet
            label="배너 제목"
            isRequired
            tooltipDesc={`홈페이지 메인 배너에 표시될 제목입니다.<br />"/n"을 넣으면 줄바꿈이 되어 표시됩니다.<br />사용자의 관심을 끌 수 있는 임팩트 있는 문구를 작성해주세요.`}
          >
            <Input
              {...register("title")}
              placeholder="배너 제목을 입력하세요"
            />
          </FieldSet>

          <FieldSet
            label="배너 부제목"
            isRequired
            tooltipDesc={`배너 제목을 보완하는 설명문구입니다.<br />제품이나 서비스의 핵심 가치를 간결하게 표현해주세요.`}
          >
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
              tooltipDesc={`데스크톱과 태블릿에서 표시될 배너 이미지입니다.<br />권장 해상도: 1920x640px (3:1 비율)<br />5MB 이하의 이미지 파일만 업로드 가능합니다.`}
            />

            <ImageUploadField
              label="배너 모바일 이미지"
              fieldName="bannerMobileImage"
              setValue={setValue}
              watch={watch}
              isRequired
              tooltipDesc={`모바일 기기에서 표시될 배너 이미지입니다.<br />권장 해상도: 768x768px (1:1 비율)<br />5MB 이하의 이미지 파일만 업로드 가능합니다.`}
            />
          </div>

          <FieldSet
            label="배너 링크"
            isRequired
            tooltipDesc={`배너 클릭 시 이동할 URL입니다.<br />https://로 시작하는 완전한 URL을 입력해주세요.<br />예: https://example.com`}
          >
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
