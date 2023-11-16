import React, { ReactNode, useState } from "react";

import threeDot from "../../../../public/threeDot.svg";
import Image from "next/image";
import DropDownWrapper from "./DropDownWrapper";

interface DropDownProps {
  children: ReactNode;
}

export default function DropDown({ children }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickDots = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className=" relative">
      <button onClick={onClickDots} className="flex-box w-[24px] h-[24px]">
        <Image src={threeDot} alt="storeIcon" />
      </button>
      {isOpen && <DropDownWrapper setIsOpen={setIsOpen}>{children}</DropDownWrapper>}
    </div>
  );
}
