import React from "react";

interface StatusIconProps {
  status: "NEW" | "HOT";
}

export default function StatusIcon({ status }: StatusIconProps) {
  const boxColor = status == "NEW" ? "bg-[#D4FFCD] text-[#55AF45]" : "bg-[#FFE1E6] text-[#EA4D69]";
  return (
    <div className={`flex-box py-1 px-2 rounded ${boxColor} w-[39px] h-[18px]`}>
      <span className="font-bold text-[10px]">{status}</span>
    </div>
  );
}
