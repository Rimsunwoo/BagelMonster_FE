import React from "react";

import KakaoMap from "@/components/common/KakaoMap";
import OrderTotalPrice from "@/components/receipt/OrderTotalPrice";
import ReceiptButtons from "@/components/receipt/ReceiptButtons";
import ReceiptTextBox from "@/components/receipt/ReceiptTextBox";
import { changeFormat } from "@/utils/changeFormat";

const mockOrder = {
  orderNum: 1235656132,
  orderTime: "2023-11-06 09:51:21",
  storeName: "코끼리 베이글 서초점",
  storeTel: "02)749-7778",
  storeAddress: "서울 용산구 서빙고로91길 10",
  productList: ["올리브 치즈 베이글", "베이글", "베이글2"],
  price: 16000,
  discount: 4000,
};

export default function Receipt() {
  return (
    <div className="w-full tracking-tight leading-tight px-[12px]">
      <h2 className="mt-[68px] text-[32px] tracking-tight leading-tight font-regular text-black">
        <span className=" font-bold">주문</span>이 <br />
        <span className=" font-bold">완료</span>되었습니다 :)
      </h2>
      <div className="flexcol gap-[14px] mt-[40px] py-[24px] border-y-[1px] border-[#C5C5C5]">
        <ReceiptTextBox title="주문 시간" content={mockOrder.orderTime} />
        <ReceiptTextBox title="주문 번호" content={mockOrder.orderNum} />
        <ReceiptTextBox title="주문 상품명" content={changeFormat.outer(mockOrder.productList)} />
      </div>
      <div className="flexcol gap-[14px] py-[24px] border-b-[1px] border-[#C5C5C5]">
        <ReceiptTextBox title="가게명" content={mockOrder.storeName} />
        <ReceiptTextBox title="전화번호" content={mockOrder.storeTel} />
        <ReceiptTextBox title="주소" content={mockOrder.storeAddress} />
        <KakaoMap />
      </div>
      <div className="flexcol gap-[24px] mt-[62px]">
        <OrderTotalPrice totalPrice={mockOrder.price - mockOrder.discount} />
        <ReceiptButtons />
      </div>
    </div>
  );
}
