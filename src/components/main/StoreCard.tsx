import Image from "next/image";
import Link from "next/link";

import type { IStore } from "@/types/store.type";

interface Props {
  store: IStore;
}

export default function StoreCard({ store }: Props) {
  return (
    <li className="shadow-main rounded list-none">
      <Link href={`stores/${store.storeId}`} className="w-[180px] flexcol drag-none">
        <Image
          src={store.storePictureUrl}
          width={180}
          height={140}
          alt={store.name}
          className="w-[180px] h-[140px] drag-none"
        />
        <div className="w-full px-6 py-5">
          <p className="w-full text-black text-sm font-bold leading-[150%] truncate">{store.name}</p>
          <p className="w-full text-[#787878] text-[11px] font-normal leading-[150%]">{store.address}</p>
        </div>
      </Link>
    </li>
  );
}
