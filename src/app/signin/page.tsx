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
          <div className="flex justify-end items-center gap-1 self-stretch text-[#999]">
            <input className="text-center text-xs leading-[150%] cursor-pointer" type="button" value="아이디 찾기" />
            <span className="py-0 w-px h-3 bg-[#999]" />
            <input className="text-center text-xs leading-[150%] cursor-pointer" type="button" value="비밀번호 찾기" />
          </div>
          <span className="self-stretch h-px bg-[#d9d9d9]" />
        </div>
        <div className="flexcol gap-3 self-stretch">
          <input className="self-stretch text-button social-button" type="button" value="카카오로 로그인하기" />
          <input className="self-stretch text-button social-button" type="button" value="구글 로그인하기" />
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
