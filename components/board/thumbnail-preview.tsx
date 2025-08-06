"use client";

import { useRef } from "react";

import InputGroup from "@/components/board/input-group";
import { Button } from "@/components/ui/button";

export default function ThumbnailPreview() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: 업로드 로직 or preview용 URL 생성
    console.log("선택된 파일:", file);
  };

  return (
    <InputGroup label="썸네일" isRequired>
      <div className="bg-muted rounded-lg max-w-50 h-40 flex justify-center items-center">
        {/* 숨겨진 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button onClick={handleAvatarClick}>이미지 업로드</Button>
      </div>
    </InputGroup>
  );
}
