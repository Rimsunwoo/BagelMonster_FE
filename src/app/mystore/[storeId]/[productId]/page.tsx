"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { deleteProduct, getProduct } from "@/app/api/product";
import DropDown from "@/components/common/dropDown/DropDown";
import DropDownItem from "@/components/common/dropDown/DropDownItem";
import StatusIcon from "@/components/productDetail/StatusIcon";

import bagelDefault from "../../../../../public/bagelDefault.jpg";
import rightArrow from "../../../../../public/rightArrow.svg";

interface ProductDetailProps {
  params: {
    productId: string;
  };
}

export default function ProductDetail({ params: { productId } }: ProductDetailProps) {
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("token");

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

  const param = { name, description, price, status, productPictureUrl, productId };
  const editURLObj = {
    pathname: `/mystore/${storeId}/editmenu`,
    query: param,
  };

  const onClickDropDownDelete = async () => {
    try {
      const isConfirm = confirm("정말 삭제하시겠습니까?");
      if (!isConfirm) return;

      await deleteProduct(storeId, productId, token);
      router.push("/mystore");
    } catch (error) {
      alert("오류 발생");
      router.push("/mystore");
    }
  };

  return (
    <section>
      <div className="w-full h-[560px] overflow-hidden relative mb-6">
        {productPictureUrl ? (
          <Image src={productPictureUrl} alt="storeImage" fill />
        ) : (
          <Image src={bagelDefault} alt="bagelDefaultImg" fill />
        )}
      </div>
      <div className="px-5">
        <div className="flex items-center justify-between mb-[11px]">
          <div className="flex items-center gap-1 cursor-pointer">
            <h2 className="text-sm">{storeName}</h2>
            <Image src={rightArrow} alt="storeIcon" />
          </div>
          <DropDown>
            <DropDownItem>
              <Link href={editURLObj}>수정</Link>
            </DropDownItem>
            <DropDownItem onClick={onClickDropDownDelete}>삭제</DropDownItem>
          </DropDown>
        </div>
        <div className="flex items-center mb-7">
          <h2 className="text-xl font-semibold mr-2">{name}</h2>
          <StatusIcon status="NEW" />
        </div>
        <p className="border border-[#D9D9D9] px-4 py-3 mb-[60px] rounded-lg text-[11px]">{description}</p>
      </div>
    </section>
  );
}
