import Link from "next/link";

import SigninForm from "@/components/signin/SigninForm";

export default function signin() {
  return (
    <div className="w-full px-5 bg-white">
      {/* <Image src="" alt="icon" width={90} height={45} className="bg-[#ff0000]/[.30]" /> */}
      <p className="text-title">로그인</p>
      <div className="flexcol items-center gap-10 w-full">
        <div className="flexcol gap-6 self-stretch">
          <SigninForm />
          <span className="self-stretch h-px bg-[#d9d9d9]" />
        </div>
        <div className="flex justify-center items-center gap-1 self-stretch">
          <p className="text-label">아직 회원이 아니신가요?</p>
          <Link className="text-[#999] text-xs font-medium leading-[125%]" href="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
