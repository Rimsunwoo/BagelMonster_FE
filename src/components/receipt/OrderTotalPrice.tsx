import React from "react";

interface OrderTotalPriceProps {
  totalPrice: number;
}

export default function OrderTotalPrice(props: OrderTotalPriceProps) {
  return (
    <div>
      <div className="w-full flex justify-between text-[18px]">
        <p className="text-black font-bold">총 결제금액</p>
        <span className="text-orange font-semiBold">{props.totalPrice}원</span>
      </div>
    </div>
  );
}
