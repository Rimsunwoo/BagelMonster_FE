import type { ReactNode } from "react";
import React, { useEffect, useRef } from "react";

interface DropDownWrapperProps {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropDownWrapper(props: DropDownWrapperProps) {
  const { children, setIsOpen } = props;
  const dropDownRef = useRef<HTMLUListElement>(null);

  const onClickItem = (e: MouseEvent) => {
    e.preventDefault();
    if (dropDownRef.current === null) return;

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", onClickItem);
    return () => {
      document.removeEventListener("click", onClickItem);
    };
  }, []);

  return (
    <ul ref={dropDownRef} className="drop-down">
      {children}
    </ul>
  );
}
