"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const switchTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "로고 예정";
      case "/stores":
        return "가게리스트";
      case "/cart":
        return "장바구니";
      case "/signin":
        return "로그인";
      case "/signup":
        return "회원가입";
      default:
        return "Bagel Monster";
    }
  };

  return (
    <header className="sticky top-0 w-full h-[70px] bg-[#fff] z-50 flex justify-center items-center">
      <p className="text-stone-900 text-sm font-semibold leading-snug text-center">{switchTitle(pathname)}</p>
    </header>
  );
}
