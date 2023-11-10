import React from "react";

import type { SidebarProps } from "./Header";

export default function HamburgerButton({ isOpenSidebar, openHandler }: SidebarProps) {
  return (
    <div className="hamburger-button">
      <input type="checkbox" checked={isOpenSidebar} onChange={openHandler} />
      <span />
      <span />
      <span />
    </div>
  );
}
