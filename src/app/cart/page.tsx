"use client";

import ProductList from "@/components/cart/ProductList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCart, getCart, postOrder } from "../api/carts";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/config/configStore";
import { useRouter } from "next/navigation";

interface BuyProductRequest {
  productId: number;
  quantity: number;
  price: number;
}

export default function Cart() {
  const router = useRouter();
  const [selectItem, setSelectItem] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { getCookie } = useAuth();
  const { data: cartData } = useQuery({ queryKey: ["carts"], queryFn: () => getCart(getCookie()) });

  const [buyProduct, setBuyProduct] = useState<BuyProductRequest[]>([]);

  useEffect(() => {
    if (!cartData) return;
    cartData.products.forEach((product) => {
      setBuyProduct((prev) => [
        ...prev,
        { productId: product.productId, quantity: product.quantity, price: product.price },
      ]);
    });
  }, [cartData]);

  const counter = useSelector((state: RootState) => state.productCount);

  useEffect(() => {
    if (buyProduct.length !== 0) {
      const newProduct = buyProduct.map((item) => {
        const [_, count] = Object.entries(counter).find((count) => +count[0] === item.productId)!;
        item.quantity = count;
        return item;
      });
      setBuyProduct(newProduct);
    }
  }, [counter]);

  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  const postOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts", cartData?.cartId] });
    },
  });

  const onSelectProduct = (productId: number) => {
    if (selectItem.includes(productId)) {
      setSelectItem(selectItem.filter((id) => id !== productId));
    } else {
      setSelectItem((prev) => [...prev, productId]);
    }
  };

  const onSelectAllProduct = () => {
    if (selectItem.length === cartData?.products.length) {
      setSelectItem([]);
    } else {
      setSelectItem(cartData?.products.map((product) => product.productId) ?? []);
    }
  };

  const onDeleteProduct = () => {
    if (selectItem.length === 0) return;
    if (!cartData) return;

    selectItem.forEach((id) => {
      deleteCartMutation.mutate({ cartId: cartData.cartId, productId: id, token: getCookie() });
    });
  };

  const onDeleteAllProduct = () => {
    if (cartData?.products.length === 0) return;
    if (!cartData) return;

    cartData.products.forEach((product) => {
      deleteCartMutation.mutate({ cartId: cartData.cartId, productId: product.productId, token: getCookie() });
    });
  };

  const productList = buyProduct.map((item) => ({ productId: item.productId, quantity: item.quantity }));
  console.log("buyProduct :", buyProduct);
  const totalCount = buyProduct.reduce((acc, data) => acc + data.quantity, 0) ?? 0;
  const totalPrice = buyProduct.reduce((acc, data) => acc + data.quantity * data.price, 0) ?? 0;

  const buyHandler = () => {
    if (!cartData) return;

    postOrderMutation.mutate({
      cartId: cartData.cartId,
      productList,
      token: getCookie(),
      totalPrice,
    });
    router.push("/receipt");
  };

  return (
    <div className="w-full bg-white flex h-[120vh] flex-col gap-6">
      <div className="w-full flexcol items-center gap-6">
        <div className="w-full flex justify-between items-center px-[5%]">
          <div className="flex gap-2 items-center">
            <input
              className="checkbox"
              type="checkbox"
              id="selectAll"
              checked={selectItem.length === cartData?.products.length}
              onChange={onSelectAllProduct}
            />
            <label className="text-black text-[13px] font-medium leading-[125%] select-none" htmlFor="selectAll">
              전체선택
            </label>
          </div>
          <div className="flex gap-2 items-center text-[#888] text-[13px] font-normal leading-[125%]">
            <input className="cursor-pointer" type="button" value={"선택삭제"} onClick={onDeleteProduct} />
            <span className="w-px h-2.5 bg-[#c5c5c5]" />
            <input className="cursor-pointer" type="button" value={"전체삭제"} onClick={onDeleteAllProduct} />
          </div>
        </div>

        <div className="w-full bg-[#f5f5f5] h-2.5" />

        <div className="w-full flex-col justify-start items-center gap-8 flex">
          <ProductList
            productList={cartData?.products}
            cartId={cartData?.cartId}
            selectItem={selectItem}
            onSelectProduct={onSelectProduct}
            deleteCartMutation={deleteCartMutation}
          />
        </div>
        <div className="w-full bg-[#f5f5f5] h-2.5" />

        <div className="w-full flex-col justify-start items-center flex gap-6 px-[5%]">
          <div className="flexcol w-full">
            <p className="self-stretch justify-between items-start inline-flex text-sm font-medium leading-[150%]">
              <span className="text-gray">주문 상품 수</span>
              <span className="text-black">총 {totalCount}개</span>
            </p>
            <p className="self-stretch justify-between items-center inline-flex text-lg leading-[150%]">
              <span className="text-black font-bold">총 결제금액</span>
              <span className="text-[#f15a23] font-semibold">
                {totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
              </span>
            </p>
          </div>
          <input
            className="w-full px-4 py-3 rounded bg-[#f15a23] text-[#fff] text-lg font-semibold leading-[125%] cursor-pointer"
            onClick={buyHandler}
            value="구매하기"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
