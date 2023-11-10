import React from "react";

import KakaoMap from "@/components/common/KakaoMap";
import OrderContent from "@/components/receipt/OrderContent";
import OrderInfo from "@/components/receipt/OrderInfo";
import OrderTotalPrice from "@/components/receipt/OrderTotalPrice";
import ReceiptButtons from "@/components/receipt/ReceiptButtons";

const mockOrder = {
  orderNum: 1235656132,
  orderTime: "2023-11-06 09:51:21",
  productList: ["올리브 치즈 베이글", "베이글", "베이글2"],
  price: 16000,
  discount: 4000,
};

export default function Receipt() {
  return (
    <div className="w-full tracking-tight leading-tight px-[12px]">
      <h2 className="mt-[68px] text-[32px] tracking-tight leading-tight font-Regular">
        <span className=" font-Bold">주문</span>이 <br />
        <span className=" font-Bold">완료</span>되었습니다 :)
      </h2>
      <div className="mt-[62px]">
        <KakaoMap />
      </div>
      <div className="flexcol gap-[24px] mt-[62px]">
        <OrderInfo orderNum={mockOrder.orderNum} orderTime={mockOrder.orderTime} />
        <OrderContent productList={mockOrder.productList} price={mockOrder.price} discount={mockOrder.discount} />
        <OrderTotalPrice totalPrice={mockOrder.price - mockOrder.discount} />
        <ReceiptButtons />
      </div>
    </div>
  );
}
