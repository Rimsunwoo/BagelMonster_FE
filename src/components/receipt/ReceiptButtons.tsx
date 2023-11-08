import React from "react";

export default function ReceiptButtons() {
  return (
    <div className="flex justify-end gap-2">
      <button className="normal-button bg-[#DDDDDD] text-[#666666]">주문내역 보기</button>
      <button className="normal-button bg-orange text-white">목록보기</button>
    </div>
  );
}
