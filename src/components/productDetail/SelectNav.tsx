"use client";

import { useSelector } from "react-redux";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { PostCart } from "@/app/api/carts";
import useAuth from "@/hooks/useAuth";
import { changeFormat } from "@/utils/changeFormat";

import Counter from "../common/Counter";

import type { RootState } from "@/redux/config/configStore";
import type { PostCartRequest } from "@/types/cart.type";
import type { Product } from "@/types/product.type";

type SelectNavProps = Pick<Product, "name" | "price">;

export default function SelectNav({ name, price }: SelectNavProps) {
  const router = useRouter();
  const { isLogin, getCookie, signout } = useAuth();

  const pathName = usePathname().split("/");
  const storeId = pathName[2];
  const productId = pathName[3];
  const quantity = useSelector((state: RootState) => state.productCount[productId]);

  const request = { storeId, productId, quantity, token: getCookie() };

  const onSubmitAddCart = async (request: PostCartRequest) => {
    if (!isLogin()) {
      //#TODO alert=>toast변경
      alert("로그인해주세요");
      router.push("/");
      return;
    }
    try {
      await PostCart(request);
      router.push(`/stores/${storeId}`);
    } catch (error: any) {
      //  0 => 다른가게 상품
      //  1 => 같은가게 같은상품 존재
      const errCode = error.split(" ")[0];
      if (errCode == 0) {
        alert("다른가게의 상품이 존재합니다. 장바구니로 이동합니다.");
        router.push("/cart");
      } else if (errCode == 1) {
        alert("이미 장바구니에 같은 상품이 존재합니다");
        router.back();
      } else if (errCode === "INVALID_TOKEN") {
        alert("다시 로그인해주세요");
        signout();
        return;
      }
    }
  };
  return (
    <section>
      <div className="flex justify-between mb-2">
        <h2 className="text-gray text-sm">{name}</h2>
        <Counter productId={Number(productId)} />
      </div>
      <div className="flex justify-between text-sm mb-6">
        <h2 className="text-gray">개별 금액</h2>
        <h2>{changeFormat.price(price)}원</h2>
      </div>
      <div className="flex justify-between mb-6 text-lg font-semibold">
        <h2>총 금액</h2>
        <span className="text-orange">{changeFormat.totalPrice({ price, quantity })}원</span>
      </div>
      <button className="w-full flex justify-center auth-button text-button" onClick={() => onSubmitAddCart(request)}>
        장바구니 담기
      </button>
    </section>
  );
}
