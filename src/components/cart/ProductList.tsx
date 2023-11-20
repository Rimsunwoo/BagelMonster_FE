"use client";

import { Fragment } from "react";

import Image from "next/image";

import useAuth from "@/hooks/useAuth";
import { changeFormat } from "@/utils/changeFormat";

import Counter from "../common/Counter";

import type { CartDeleteRequest } from "@/app/api/carts";
import type { ProductGetResponse } from "@/types/cart.type";
import type { UseMutationResult } from "@tanstack/react-query";

interface ProductListProps {
  productList: ProductGetResponse[] | undefined;
  cartId: number | undefined;
  selectItem: number[];
  onSelectProduct: (productId: number) => void;
  deleteCartMutation: UseMutationResult<void, Error, CartDeleteRequest, unknown>;
}

export default function ProductList(props: ProductListProps) {
  const { productList, cartId, selectItem, onSelectProduct, deleteCartMutation } = props;
  const { getCookie } = useAuth();

  const deleteProduct = (productId: number) => {
    if (cartId === undefined) return;
    deleteCartMutation.mutate({ cartId, productId, token: getCookie() });
  };

  if (productList === undefined || cartId === undefined || productList.length === 0)
    return <p>현재 담으신 상품이 없습니다.</p>;

  return (
    <div className="w-full flex-col gap-6 flex px-[5%] select-none">
      {productList.map((product, index) => (
        <Fragment key={product.productId}>
          {index !== 0 && <div className="w-full bg-[#ebebeb] h-px" />}
          <div className="w-full px-3 bg-white flex gap-3">
            <input
              className="checkbox"
              type="checkbox"
              id={product.name}
              checked={selectItem.includes(product.productId)}
              onChange={() => onSelectProduct(product.productId)}
            />
            <label htmlFor={product.name} className="gap-5 inline-flex items-center">
              <div className="w-24 h-24px relative">
                <Image src={product.productPictureUrl} alt={product.name} width={96} height={96} className="rounded" />
              </div>
              <div className="flex-col gap-3 inline-flex">
                <div className="flex-col gap-2 flex">
                  <p className=" text-zinc-800 text-base font-bold leading-snug">{product.name}</p>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <p className="text-[#f15a23] text-sm font-bold leading-tight">
                      {changeFormat.price(product.price)}원
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Counter defaultValue={product.quantity} productId={product.productId} />
                  <button
                    className="border border-[#ddd] rounded-sm px-2 py-1 h-6 text-black text-[13px] font-medium leading-[125%]"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    선택 삭제
                  </button>
                </div>
              </div>
            </label>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
