"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isLogo = () => {
    return pathname === "/" || pathname === "/signin" || pathname === "/signup" ? true : false;
  };

  const switchTitle = () => {
    switch (pathname) {
      case "/":
        return "/headerLogo.png";
      case "/stores":
        return "가게리스트";
      case "/cart":
        return "장바구니";
      case "/signin":
        return "/authLogo.png";
      case "/signup":
        return "/authLogo.png";
      case "/reciept":
        return "주문내역";
      default:
        return "Bagel Monster";
    }
  };

  return (
    <header className="sticky top-0 w-full h-[70px] bg-[#fff] z-50 flex justify-center items-center">
      {isLogo() ? (
        <Image src={switchTitle()} alt="logo" width={110} height={40} className="drag-none" />
      ) : (
        <p className="text-black text-lg font-bold leading-snug text-center">{switchTitle()}</p>
      )}
    </header>
  );
}
