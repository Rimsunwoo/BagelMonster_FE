import Image from "next/image";
import Link from "next/link";

import SelectNav from "@/components/productDetail/SelectNav";
import StatusIcon from "@/components/productDetail/StatusIcon";

import bagelDefault from "../../../../../public/bagelDefailt.jpg";
import prevBtn from "../../../../../public/prevBtn.svg";
import rightArrow from "../../../../../public/rightArrow.svg";

import type { Product } from "@/types/product.type";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

export default function ProductDetail({ params: { productId } }: ProductDetailProps) {
  const { storeName, name, price, productPictureUrl, popularity, status, description } = mockProduct;
  return (
    <div>
      {/* #TODO 실제 데이터는 Image태그로 변경 */}
      <div className="w-full h-[350px]">
        {productPictureUrl ? (
          <Image src={productPictureUrl} alt="storeImage" width={560} height={350} fill />
        ) : (
          <Image src={bagelDefault} alt="bagelDefaultImg" fill />
        )}
      </div>
      <div className="w-full h-[350px] mb-6 bg-cover bg-no-repeat bg-center bg-[url('https://www.shinsegaefood.com/brand/milkandhoney/brand/milkhoney/images/sub/bagel/rolling_einstein_10.jpg')]" />
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

const mockProduct: Product = {
  productId: 1,
  storeName: "코끼리 베이글",
  name: "올리브치즈 베이글",
  price: 7000,
  productPictureUrl:
    "https://www.shinsegaefood.com/brand/milkandhoney/brand/milkhoney/images/sub/bagel/rolling_einstein_10.jpg",
  popularity: "1",
  status: true,
  description: "올리브와 치즈가 들어가 맛나요",
  createdDate: "2023-11-06T15:00",
  modifiedDate: "2023-11-06T15:00",
};
