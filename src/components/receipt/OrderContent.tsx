import React from "react";

interface OrderContentProps {
  productList: string[];
  price: number;
  discount: number;
}

export default function OrderContent(props: OrderContentProps) {
  const { productList, price, discount } = props;
  const productLength = productList.length;
  return (
    <div className="flexcol gap-[14px] py-[32px] border-y-[1px] border-[#C5C5C5]">
      <div className="w-full flex justify-between">
        <p className="text-gray font-medium">주문상품명</p>
        <span className="text-black font-semiBold">
          {productLength === 1 ? productList[0] : `${productList[0]} 외 ${productLength - 1}개`}
        </span>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-gray font-medium">상품금액</p>
        <span className="text-black font-semiBold">{price}원</span>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-gray font-medium">상품할인</p>
        <span className="text-black font-semiBold">{discount}원</span>
      </div>
    </div>
  );
}
