"use client";

import { useSelector } from "react-redux";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { addCart } from "@/app/api/product";

import Counter from "../common/Counter";

import type { RootState } from "@/redux/config/configStore";
import type { Product, ProductApi } from "@/types/product.type";
import useAuth from "@/hooks/useAuth";

type SelectNavProps = Pick<Product, "name" | "price">;

export default function SelectNav({ name, price }: SelectNavProps) {
  const router = useRouter();
  const pathName = usePathname().split("/");
  const storeId = pathName[2];
  const productId = pathName[3];
  const quantity = useSelector((state: RootState) => state.productCount[productId]);
  let totalPrice = (price * quantity).toLocaleString();
  const request = { storeId, productId, quantity };
  const { isLogin } = useAuth();
  const onSubmitAddCart = async (request: ProductApi) => {
    if (!isLogin()) {
      //#TODO alert=>toast변경
      alert("로그인해주세요");
      router.push("/");
      return;
    }
    try {
      await addCart(request);
      router.push(`/stores/${storeId}`);
    } catch (error) {
      // #TODO alert 대신 toast로 변경
      alert(error);
    }
  };
  return (
    <section>
      <div className="flex justify-between mb-2">
        <h2 className="text-gray text-sm">{name}</h2>
        <Counter productId={productId} />
      </div>
      <div className="flex justify-between text-sm mb-6">
        <h2 className="text-gray">개별 금액</h2>
        <h2>{price}원</h2>
      </div>
      <div className="flex justify-between mb-6 text-lg font-semibold">
        <h2>총 금액</h2>
        <span className="text-orange">{totalPrice}원</span>
      </div>
      <button className="w-full flex justify-center auth-button text-button" onClick={() => onSubmitAddCart(request)}>
        장바구니 담기
      </button>
    </section>
  );
}
