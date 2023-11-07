import Image from "next/image";
import Link from "next/link";

import SignupForm from "@/components/signup/SignupForm";

export default function Signup() {
  return (
    <div className="w-full bg-white">
      <Image src="" alt="icon 자리" width={90} height={45} className="bg-[#ff0000]/[.30]" />
      <p className="text-title">회원가입</p>
      <div className="flex flex-col items-center">
        <SignupForm />
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
