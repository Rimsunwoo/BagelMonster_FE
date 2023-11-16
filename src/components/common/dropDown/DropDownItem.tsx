import type { ReactNode } from "react";
import React from "react";

interface DropDownItemProps {
  children: ReactNode;
  onClick: () => void;
}

export default function DropDownItem(props: DropDownItemProps) {
  const { children, onClick } = props;
  return (
    <li onClick={onClick} className="drop-down-item">
      {children}
    </li>
  );
}
