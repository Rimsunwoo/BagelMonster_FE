import Link from "next/link";

export default function Login() {
  return (
    <div className="w-[360px] bg-white">
      {/* <Image src="" alt="icon" width={90} height={45} className="bg-[#ff0000]/[.30]" /> */}
      <p className="text-title">로그인</p>
      <div className="flex flex-col items-center gap-10 w-80">
        <div className="flex flex-col gap-6 self-stretch">
          <form className="flex flex-col gap-4 self-stretch">
            <label className="flex flex-col gap-2 self-stretch text-label" htmlFor="id">
              아이디
              <input
                className="flex items-center gap-2 self-stretch auth-input text-input"
                placeholder="아이디를 입력해주세요"
                type="text"
                id="id"
              />
            </label>
            <label className="flex flex-col gap-2 self-stretch text-label" htmlFor="password">
              비밀번호
              <input
                className="flex items-center gap-2 self-stretch auth-input text-input"
                placeholder="비밀번호를 입력해주세요"
                id="password"
              />
            </label>
            <input
              className="flex justify-center items-center gap-2 self-stretch auth-button text-button"
              type="submit"
              value="로그인"
            />
          </form>
          <div className="flex justify-end items-center gap-1 self-stretch text-[#999]">
            <input className="text-center text-xs leading-[150%] cursor-pointer" type="button" value="아이디 찾기" />
            <span className="py-0 w-px h-3 bg-[#999]" />
            <input className="text-center text-xs leading-[150%] cursor-pointer" type="button" value="비밀번호 찾기" />
          </div>
          <span className="self-stretch h-px bg-[#d9d9d9]" />
        </div>
        <div className="flex flex-col gap-3 self-stretch">
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
