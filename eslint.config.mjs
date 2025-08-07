import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 기존 규칙들
      "@typescript-eslint/no-explicit-any": "off",
      "no-control-regex": "off",
      "no-useless-escape": "off",

      // 새로 추가된 규칙들
      // React 관련
      "react/no-unescaped-entities": "off", // JSX 내 이스케이프되지 않은 문자 허용

      // TypeScript 관련
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // _로 시작하는 매개변수 무시
          varsIgnorePattern: "^_", // _로 시작하는 변수 무시
          destructuredArrayIgnorePattern: "^_", // 구조분해할당에서 _로 시작하는 항목 무시
        },
      ],

      // Next.js 관련
      "@next/next/no-img-element": "off", // img 태그 사용 허용 (또는 "warn"으로 경고만)

      // Console 관련
      "no-console": "off", // console 사용 허용
    },
  },
];

export default eslintConfig;
