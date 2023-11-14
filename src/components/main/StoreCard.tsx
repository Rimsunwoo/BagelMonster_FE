"use client";

import { getStore } from "@/app/api/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function StoreCard({ width, height }: { width: number; height: number }) {
  const { data: storeData } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
  });

  return (
    <>
      {storeData.map((data) => (
        <li key={data.storeId} className="shadow-main rounded list-none">
          <Link href={`stores/${data.storeId}`} className="drag-none">
            <Image
              src={data.storePictureUrl}
              width={width}
              height={height}
              alt=""
              className={`w-[${width}px] h-[${height}px] drag-none`}
            />
            <div className={`w-[${width}px] px-6 py-5`}>
              <p className="text-black text-sm font-bold leading-[150%] truncate">{data.name}</p>
              <p className="text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
