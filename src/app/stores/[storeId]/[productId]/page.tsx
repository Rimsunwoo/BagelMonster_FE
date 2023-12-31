"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getProduct } from "@/app/api/product";
import SelectNav from "@/components/productDetail/SelectNav";
import StatusIcon from "@/components/productDetail/StatusIcon";

import bagelDefault from "../../../../../public/bagelDefault.jpg";
import prevBtn from "../../../../../public/prevBtn.svg";
import rightArrow from "../../../../../public/rightArrow.svg";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

export default function ProductDetail({ params: { productId } }: ProductDetailProps) {
  const pathName = usePathname().split("/");
  const storeId = pathName[2];
  const {
    isPending,
    isError,
    data: productDetailData,
  } = useQuery({ queryKey: ["productDetail", productId], queryFn: () => getProduct(storeId, productId) });

  if (productDetailData === undefined) {
    return <div>오류</div>;
  }
  if (isPending) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>상품정보를 불러오는데 실패했습니다</div>;
  }

  const { storeName, name, price, productPictureUrl, popularity, status, description } = productDetailData;

  return (
    <div>
      <div className="w-full h-[560px] overflow-hidden relative mb-6">
        {productPictureUrl ? (
          <Image src={productPictureUrl} alt="storeImage" fill />
        ) : (
          <Image src={bagelDefault} alt="bagelDefaultImg" fill />
        )}
      </div>
      <div className="px-5">
        <Image src={prevBtn} alt="prevButton" className="absolute top-0" />
        <Link href="/" className="flex items-center mb-[11px]">
          <h1 className="text-sm">{storeName}</h1>
          <Image src={rightArrow} alt="storeIcon" />
        </Link>
        <main className="flex items-center mb-7">
          <h1 className="text-xl font-semibold mr-2">{name}</h1>
          <StatusIcon status="NEW" />
        </main>
        <p className="border border-[#D9D9D9] px-4 py-3 mb-[60px] rounded-lg text-[11px]">{description}</p>
        <SelectNav name={name} price={price} />
      </div>
    </div>
  );
}
