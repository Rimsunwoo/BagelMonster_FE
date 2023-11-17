"use client";
import { usePathname } from "next/navigation";

interface IconProps {
  href: string;
  width: number;
  height: number;
}

const homeIcon =
  "M16 5.60342L26 13.9368V27H6V13.9368L16 5.60342ZM28 13L16 3L4 13V27V29H6H26H28V27V13ZM10 19V21H22V19H10Z";
const mypageIcon =
  "M13 9C13 7.34315 14.3431 6 16 6C17.6569 6 19 7.34315 19 9C19 10.6569 17.6569 12 16 12C14.3431 12 13 10.6569 13 9ZM16 4C13.2386 4 11 6.23858 11 9C11 11.7614 13.2386 14 16 14C18.7614 14 21 11.7614 21 9C21 6.23858 18.7614 4 16 4ZM16 15C9.37258 15 4 20.3726 4 27V28V29H5H27H28V28V27C28 20.3726 22.6274 15 16 15ZM6 27C6 21.4772 10.4772 17 16 17C21.5228 17 26 21.4772 26 27H6Z";
const listIcon =
  "M6 13.5C6 9.35786 9.35786 6 13.5 6C17.6421 6 21 9.35786 21 13.5C21 17.6421 17.6421 21 13.5 21C9.35786 21 6 17.6421 6 13.5ZM13.5 4C8.25329 4 4 8.25329 4 13.5C4 18.7467 8.25329 23 13.5 23C15.7631 23 17.8415 22.2086 19.4733 20.8875L26.2929 27.7071L27.7071 26.2929L20.8875 19.4733C22.2086 17.8415 23 15.7631 23 13.5C23 8.25329 18.7467 4 13.5 4Z";
const cartIcon =
  "M11 8C11 5.23858 13.2386 3 16 3C18.7614 3 21 5.23858 21 8V9H25H25.8951L25.9939 9.88957L27.9939 27.8896L28.1173 29H27H5.00002H3.88275L4.00613 27.8896L6.00613 9.88957L6.10497 9H7.00002H11V8ZM11 11V14H13V11H19V14H21V11H24.105L25.8828 27H6.11728L7.89506 11H11ZM19 9H13V8C13 6.34315 14.3432 5 16 5C17.6569 5 19 6.34315 19 8V9Z";

export default function Icon({ href, width, height }: IconProps) {
  const pathName = usePathname();

  const iconPath = () => {
    switch (href) {
      case "/":
        return homeIcon;
      case "/mypage":
        return mypageIcon;
      case "/stores":
        return listIcon;
      case "/mystore":
        return homeIcon;
      case "/cart":
        return cartIcon;
      case "/signin":
        return mypageIcon;
    }
  };

  return (
    <svg
      className="hover:opacity-100"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={iconPath()} fill={`${pathName === href ? "#333" : "#aaa"}`} />
    </svg>
  );
}
