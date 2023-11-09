"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import BackButton from "./BackButton";
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";

export interface SidebarProps {
  isOpenSidebar: boolean;
  openHandler: () => void;
}
export default function Header() {
  const pathname = usePathname();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const onClickSideMenuHandler = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const switchTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "로고 예정";
      case "/list":
        return "가게리스트";
      case "/cart":
        return "장바구니";
      case "/signin":
        return "로그인";
      case "/signup":
        return "회원가입";
      default:
        return "홈";
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full h-[70px] bg-[#fff] z-50 flexcol">
        <div className="w-full h-full flex items-center justify-between px-[3.5%] relative">
          <BackButton />
          <div className="flex flex-col w-32">
            <p className="text-stone-900 text-lg font-semibold leading-snug text-center">로고</p>
          </div>
          <HamburgerButton isOpenSidebar={isOpenSidebar} openHandler={onClickSideMenuHandler} />
        </div>
        <p className="text-stone-900 text-sm font-semibold leading-snug text-center">{switchTitle(pathname)}</p>
      </header>
      <Sidebar isOpenSidebar={isOpenSidebar} openHandler={onClickSideMenuHandler} />
    </>
  );
}
