import { Fragment } from "react";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getMyOrderList } from "@/app/api/order";
import useAuth from "@/hooks/useAuth";

import OrderInfo from "./OrderInfo";

export default function OrderList() {
  const { getCookie } = useAuth();

  const { data: myOrder } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getMyOrderList(getCookie()),
  });

  if (myOrder === undefined) return <p className="text-center my-5">주문 내역이 없습니다.</p>;

  return (
    <Fragment>
      {myOrder.map((data) => (
        <li className="bg-white rounded-lg list-none border border-gray my-5 shadow-main" key={data.cartId}>
          <Link className="w-full flex items-start gap-5 px-5 py-6 drag-none" href={`receipt/${data.cartId}`}>
            <div className="w-full">
              <p className="text-base font-bold leading-[150%]">{data.storeName}</p>
              <OrderInfo orderInfo={data} />
            </div>
          </Link>
        </li>
      ))}
    </Fragment>
  );
}
