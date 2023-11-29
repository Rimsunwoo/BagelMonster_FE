"use client";

import { Fragment } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllOrderToStore } from "@/app/api/order";
import useAuth from "@/hooks/useAuth";

import OrderButton from "./OrderButton";
import OrderInfo from "./OrderInfo";

interface Props {
  type: "new" | "read" | "done";
}

function StoreOrderList({ type }: Props) {
  const { getCookie } = useAuth();
  const token = getCookie();

  const { data: orderData } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getAllOrderToStore(token),
  });

  if (orderData === undefined) return <p>주문내역이 없습니다.</p>;

  const filterData = () => {
    if (type === "new") return orderData?.filter((data) => data.storeStatus === "NEWORDER");
    if (type === "read") return orderData?.filter((data) => data.storeStatus === "READ");
    else return orderData?.filter((data) => data.storeStatus === "SOLD" || data.storeStatus === "CANCELED");
  };

  if (filterData().length === 0) return <p>주문내역이 없습니다.</p>;

  return (
    <Fragment>
      {filterData().map((order) => (
        <li
          className="bg-white rounded-lg list-none border border-gray my-5 shadow-main cursor-default select-none"
          key={order.orderId}
        >
          <div className="w-full flexcol items-start gap-5 px-5 py-6 drag-none">
            <p className="text-base font-bold leading-[150%]">{order.storeName}</p>
            <OrderInfo orderInfo={order} />
            <OrderButton token={token} orderId={order.orderId} type={type} />
          </div>
        </li>
      ))}
    </Fragment>
  );
}

export default StoreOrderList;
