import React from "react";

interface OrderInfoProps {
  orderNum: number;
  orderTime: string;
}

export default function OrderInfo(props: OrderInfoProps) {
  return (
    <div className="text-[13px] text-gray font-regular">
      <p>주문번호 : {props.orderNum}</p>
      <p>주문시간 : {props.orderTime}</p>
    </div>
  );
}
