"use client";

import AuthorField from "@/components/board/Author-field";
import FieldSet from "@/components/board/field-set";
import ThumbnailPreview from "@/components/board/thumbnail-preview";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeIcon, UploadIcon } from "lucide-react";

export default function BoardForm() {
  return (
    <form className="space-y-4">
      <div className="flex flex-col rounded-xl bg-white p-6 space-y-4">
        <div className="flex gap-2 items-center text-sm text-gray-700 font-medium">
          <UploadIcon className="!w-4 !h-4" />

          <h2 className="leading-none font-semibold">게시글 기본정보</h2>
        </div>

        <div className="w-full justify-between flex gap-4 flex-col md:flex-row">
          <FieldSet label="제목" isRequired>
            <Input placeholder="제목을 입력하세요" />
          </FieldSet>

          <FieldSet label="설명" isRequired>
            <Input placeholder="설명을 입력하세요" />
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

        <SimpleEditor />

        <div className="flex justify-end w-full">
          <Button type="submit">게시글 작성</Button>
        </div>
      </div>
    </form>
  );
}
