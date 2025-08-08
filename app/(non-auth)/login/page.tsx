import LoginForm from "./_components/login-form";
import LoginHeader from "./_components/login-header";

export default async function LoginPage() {
  return (
    <main className="w-full px-3 md:px-0">
      <div className="max-w-[460px] mx-auto">
        <LoginHeader />

        <div className="py-7.5 flex justify-center">
          <p className="text-2xl font-[600] text-[#012748] mx-auto">
            LABCELLBIO
          </p>
        </div>

        <div className="pb-8.75 flex flex-col items-center gap-[5px]">
          <h2 className="text-xl font-medium text-black">로그인</h2>
          <h4 className="text-center text-sm text-[#777">
            관리자 계정으로만 접근 가능한 페이지입니다. <br /> 승인된 관리자
            아이디와 비밀번호를 입력해 주세요.
          </h4>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
