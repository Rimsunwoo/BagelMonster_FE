import Link from "next/link";

import type { InputProps } from "@/types/auth.type";
import SignupForm from "@/components/common/Form";

export default function Signup() {
  const inputProps: InputProps[] = [
    { id: "id", label: "아이디", placeholder: "아이디를 입력해주세요" },
    { id: "password", label: "비밀번호", placeholder: "비밀번호를 입력해주세요" },
    { id: "passwordConfirm", label: "비밀번호 확인", placeholder: "비밀번호를 한번 더 입력해주세요" },
  ];

  return (
    <div className="w-full bg-white">
      <p className="text-title">회원가입</p>
      <div className="flex flex-col items-center">
        <SignupForm inputProps={inputProps} />
        <div className="flex justify-center items-center gap-1 ">
          <div className="text-label">이미 계정이 있으신가요?</div>
          <Link className="text-[#999] text-xs font-medium leading-[125%]" href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
