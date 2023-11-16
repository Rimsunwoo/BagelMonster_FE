"use client";

import { getStore } from "@/app/api/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function StoreCard() {
  const { data: storeData } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
  });
  const newFiveStore = storeData.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1)).slice(0, 5);

  return (
    <>
      {newFiveStore.map((data) => (
        <li key={data.storeId} className="shadow-main rounded list-none">
          <Link href={`stores/${data.storeId}`} className="w-[180px] flexcol drag-none">
            <Image
              src={data.storePictureUrl}
              width={180}
              height={140}
              alt={data.name}
              className="w-[180px] h-[140px] drag-none"
            />
            <div className="w-full px-6 py-5">
              <p className="w-full text-black text-sm font-bold leading-[150%] truncate">{data.name}</p>
              <p className="w-full text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
            </div>
          </Link>
        </li>
      ))}
      <li className="shadow-main rounded flex h-[234px]">
        <Link href="/stores" className="flexcol bg-neutral-200 w-[80px] drag-none items-center justify-center h-full">
          <span className="flex items-center justify-center bg-white w-10 h-10 rounded-full text-xs font-bold leading-[150%]">
            더보기
          </span>
        </Link>
      </li>
    </>
  );
}
