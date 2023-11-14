import StatusIcon from "../productDetail/StatusIcon";

import type { Product } from "@/types/product.type";

interface StoreMenuProps {
  products: Product[];
}

export default function StoreMenu({ products }: StoreMenuProps) {
  return (
    <section>
      <h1 className="border-b-2 border-orange text-orange text-sm font-bold text-center pb-3 mt-36 mb-7">전체메뉴</h1>
      {products.length === 0 ? (
        <h2 className="font-semibold">메뉴가 없습니다</h2>
      ) : (
        products.map((product: Product) => (
          <div className="flex w-full py-3 px-5 mb-[25px]" key={product.productId}>
            <div className="bg-fuchsia-300 w-[45px] h-[45px] border">사진</div>
            <div className="gap-2 text-sm ml-5 mr-2">
              <h2 className="font-semibold">{product.name}</h2>
              <span className="text-orange">{Number(product.price).toLocaleString()}원</span>
            </div>
            {Number(product.popularity) > 3 && <StatusIcon status="HOT" />}
          </div>
        ))
      )}
    </section>
  );
}
