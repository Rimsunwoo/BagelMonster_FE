import React from "react";

import type { SidebarProps } from "./Header";

export default function HamburgerButton({ isOpenSidebar, openHandler }: SidebarProps) {
  return (
    <div onClick={openHandler} className="hamburger-button">
      <input type="checkbox" checked={isOpenSidebar} />
      <span />
      <span />
      <span />
    </div>
  );
}
