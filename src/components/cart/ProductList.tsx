import { Fragment } from "react";

import ProductItem from "./ProductItem";

import type { ProductGetResponse } from "@/types/product.type";

interface ProductListProps {
  productList: ProductGetResponse[] | undefined;
  cartId: number | undefined;
  selectedItems: number[];
  toggleProductSelection: (productId: number) => void;
}

export default function ProductList({ productList, cartId, selectedItems, toggleProductSelection }: ProductListProps) {
  const emptyCart = !productList || !cartId || productList.length === 0;
  if (emptyCart) return <p>장바구니가 비었습니다.</p>;

  return (
    <div className="w-full flexcol justify-start items-center gap-6 px-[5%] select-none">
      {productList.map((product, index) => (
        <Fragment key={product.productId}>
          {index !== 0 && <div className="w-full bg-[#ebebeb] h-px" />}
          <ProductItem
            product={product}
            selectedItems={selectedItems}
            toggleProductSelection={toggleProductSelection}
          />
        </Fragment>
      ))}
    </div>
  );
}
