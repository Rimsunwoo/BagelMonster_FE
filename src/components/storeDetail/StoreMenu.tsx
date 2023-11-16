"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import StatusIcon from "../productDetail/StatusIcon";

import type { Product } from "@/types/product.type";

interface StoreMenuProps {
  products: Product[];
  storeId?: number;
}

export default function StoreMenu({ products, storeId }: StoreMenuProps) {
  const router = useRouter();
  const currentPath = usePathname();

  const onClickMenu = (productId: number) => {
    if (storeId) router.push(`${currentPath}/${storeId}/${productId}`);
    else router.push(`${currentPath}/${productId}`);
  };

  return (
    <section>
      <ol>
        {products.length === 0 ? (
          <li className="flex w-full py-3 px-5 mb-[25px] cursor-pointer">
            <span>메뉴 등록하기</span>
          </li>
        ) : (
          products.map((product: Product) => (
            <li
              onClick={() => onClickMenu(product.productId)}
              className="flex w-full py-3 px-5 mb-[25px] cursor-pointer"
              key={product.productId}
            >
              <div className="w-[50px] h-[50px] overflow-hidden relative">
                <Image src={product.productPictureUrl} alt="storeImage" fill />
              </div>
              <div className="gap-2 text-sm ml-5 mr-2">
                <h4 className="font-semibold">{product.name}</h4>
                <span className="text-orange">{Number(product.price).toLocaleString()}원</span>
              </div>
              {Number(product.popularity) > 3 && <StatusIcon status="HOT" />}
            </li>
          ))
        )}
      </ol>
    </section>
  );
}
