"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import Icon from "./Icon";

export default function Navigation() {
  const pathName = usePathname();
  const { isLogin, isStore } = useAuth();

  const isUser = () => {
    if (isLogin()) return { href: "/mypage", name: "마이페이지" };
    else return { href: "/signin", name: "로그인" };
  };

  const userLinkList = [
    { href: "/", name: "홈" },
    { href: "/stores", name: "가게 목록" },
    { href: "/cart", name: "장바구니" },
    isUser(),
  ];

  const storeLinkList = [
    { href: "/mystore", name: "내 가게" },
    { href: "/mystore/orderlist", name: "주문 조회" },
    { href: "/mystore/edit", name: "가게 수정" },
  ];

  const linkList = isStore() ? storeLinkList : userLinkList;

  return (
    <nav className="fixed bottom-0 max-w-[560px] w-full bg-white h-20 drop-shadow-navigation rounded-t-[20px] z-50">
      <ul className="flex justify-around items-center h-full">
        {linkList.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`flexcol items-center justify-center w-[80px] text-[14px] ${
                pathName === link.href ? "text-black" : "text-gray opacity-50 hover:opacity-100"
              }`}
            >
              <Icon href={link.href} width={32} height={32} />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
