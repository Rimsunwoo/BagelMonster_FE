import Link from "next/link";

import type { SidebarProps } from "./Header";

const links = [
  { href: "/", name: "home" },
  { href: "/list", name: "가게리스트" },
  { href: "/cart", name: "장바구니" },
  { href: "/signin", name: "로그인" },
  { href: "/signup", name: "회원가입" },
];

export default function Sidebar({ isOpenSidebar, openHandler }: SidebarProps) {
  return (
    <nav
      className={`absolute right-0 top-0 bottom-0 min-h-full mt-[70px] bg-[#ddd] transition-all duration-200 ${
        isOpenSidebar ? "left-1/2" : "left-full opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-2 px-5 py-2 w-full">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} onClick={openHandler}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
