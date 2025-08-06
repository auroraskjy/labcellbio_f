"use client";

import { useRef } from "react";

import FieldSet from "@/components/board/field-set";
import InputGroup from "@/components/board/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SquarePenIcon } from "lucide-react";

export default function AuthorField() {
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
    <InputGroup label="작성자 정보">
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
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>

          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex justify-center items-center">
            <SquarePenIcon className="text-white" />
          </div>
        </Avatar>

        <FieldSet label="작성자명" isRequired>
          <Input placeholder="작성자명을 입력하세요" />
        </FieldSet>
      </div>
    </InputGroup>
  );
}
