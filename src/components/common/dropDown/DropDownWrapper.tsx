import React, { ReactNode, useEffect, useRef } from "react";

interface DropDownWrapperProps {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropDownWrapper(props: DropDownWrapperProps) {
  const { children, setIsOpen } = props;
  const dropDownRef = useRef<HTMLUListElement>(null);

  const onClickItem = (e: MouseEvent) => {
    if (dropDownRef.current === null) return;

    const isItem = dropDownRef.current.contains(e.target as HTMLElement);
    if (isItem) {
      console.log("수정으로 변신");
    }

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClickItem);
    return () => {
      document.removeEventListener("mousedown", onClickItem);
    };
  }, []);

  return (
    <ul ref={dropDownRef} className="drop-down">
      {children}
    </ul>
  );
}
