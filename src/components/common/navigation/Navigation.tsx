"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import Icon from "./Icon";

export default function Navigation() {
  const pathName = usePathname();
  const { isLogin, isStore } = useAuth();

  const isUser = (type: "href" | "name") => {
    if (!isLogin()) return type === "href" ? "/signin" : "로그인";
    if (!isStore()) return type === "href" ? "/mypage" : "마이페이지";
    return type === "href" ? "/mypage" : "가게 등록";
  };

  const links = [
    { href: "/", name: "홈" },
    { href: "/stores", name: "가게 목록" },
    { href: "/cart", name: "장바구니" },
    { href: isUser("href"), name: isUser("name") },
  ];

  return (
    <div className="fixed bottom-0 max-w-[560px] w-full bg-white h-20 drop-shadow-navigation rounded-t-[20px] z-50">
      <ul className="flex justify-between items-center h-full">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`flexcol items-center justify-center py-4 px-7 ${
                pathName === link.href ? "text-black" : "text-gray opacity-50 hover:opacity-100"
              }`}
            >
              <Icon href={link.href} width={32} height={32} />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
