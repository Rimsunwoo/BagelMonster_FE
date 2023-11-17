import Link from "next/link";

import SignupForm from "@/components/signup/SignupForm";

export default function Signup() {
  return (
    <div className="w-full px-5 bg-white">
      <p className="text-title">회원가입</p>
      <div className="flexcol items-center">
        <SignupForm />
        <div className="flex justify-center items-center gap-1 mt-1 text-label">
          <span>이미 계정이 있으신가요?</span>
          <Link className="text-[#999]" href="/signin">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
