import Image from "next/image";
import Link from "next/link";

import { changeFormat } from "@/utils/changeFormat";

import type { DistanceGap } from "@/hooks/useDistanceGap";
import type { IStore } from "@/types/store.type";

interface Props {
  store: IStore;
  distanceGap: DistanceGap;
}

export default function StoreCard({ store, distanceGap }: Props) {
  return (
    <li className="bg-white rounded-lg">
      <Link className="w-full flex items-start gap-5 px-5 py-6 drag-none" href={`stores/${store.storeId}`}>
        <div className="h-[60px] w-[60px] relative">
          <Image src={store.storePictureUrl} alt="store" fill className="drag-none" />
        </div>
        <div>
          <p className="text-base font-bold leading-[150%]">{store.name}</p>
          <div className="flex gap-[6px] mt-2 text-[#787878] text-xs font-normal leading-[150%]">
            <p>{`영업시간 : ${changeFormat.DuringTime(store.openedTime, store.closedTime)}`}</p>
            <p>|</p>
            <p>{store.closedDays}</p>
          </div>
          <p className="text-[#787878] text-xs font-normal leading-[150%]">{store.address}</p>
          {distanceGap !== undefined && (
            <p className="text-[#787878] text-xs font-normal leading-[150%]">
              가게까지 {Math.round(distanceGap[store.storeId] * 100) / 100}km
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
