import React from "react";

interface OrderTotalPriceProps {
  totalPrice: number;
}

export default function OrderTotalPrice(props: OrderTotalPriceProps) {
  const totalPrice = props.totalPrice.toLocaleString();
  return (
    <div>
      <div className="w-full flex justify-between text-[18px]">
        <p className="text-black font-bold">총 결제금액</p>
        <span className="text-orange font-semibold">{totalPrice}원</span>
      </div>
    </div>
  );
}
