"use client";

import { Fragment, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { getDistanceFromLatLonInKm } from "@/utils/distance";
import isStoreOpen from "@/utils/isStoreOpen";

import { getStore } from "../api/store";

interface ButtonProps {
  name: string;
  id: Filter;
}

type Filter = "all" | "new" | "distance";

const filterButton: ButtonProps[] = [
  { name: "전체", id: "all" },
  { name: "최신순", id: "new" },
  { name: "거리순", id: "distance" },
];

interface DistanceGap {
  [key: string]: number;
}

const { kakao } = window;

export default function Stores() {
  const [filter, setFilter] = useState<Filter>("all");
  const [showIsOpenStore, setShowIsOpenStore] = useState<boolean>(false);
  const [distanceGap, setDistanceGap] = useState<DistanceGap>({});
  const { data: storeData } = useQuery({ queryKey: ["stores"], queryFn: getStore, initialData: [] });

  const getDistanceGap = (storeId: number, address: string) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (window.kakao) {
        const { latitude: currentLat, longitude: currentLng } = position.coords;

        window.kakao.maps.load(() => {
          const geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const distanceGap = getDistanceFromLatLonInKm(+result[0].y, +result[0].x, currentLat, currentLng);
              setDistanceGap((prev) => ({ ...prev, [storeId]: distanceGap }));
            } else {
              setDistanceGap((prev) => ({ ...prev, [storeId]: 0 }));
            }
          });
        });
      }
    });
  };

  useEffect(() => {
    storeData.forEach((data) => {
      getDistanceGap(data.storeId, data.address);
    });
  }, [storeData]);

  // const date = new Date();
  // const currentTime = `${date.getHours()}${date.getMinutes()}`;

  const isOpenData = storeData.filter((data) => {
    // const openTime = data.openedTime.replace(":", "").substring(0, 4);
    // const closeTime = data.closedTime.replace(":", "").substring(0, 4);
    const isOpen = isStoreOpen(data.openedTime, data.closedTime, data.closedDays);

    return showIsOpenStore ? isOpen : data;
  });

  const filterData = () => {
    if (filter === "distance")
      return isOpenData.sort((a, b) => (distanceGap[b.storeId] < distanceGap[a.storeId] ? 1 : -1));

    if (filter === "new") return isOpenData.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));

    return isOpenData;
  };

  const handleFilterStatus = (filter: Filter) => {
    setFilter(filter);
  };

  const handleIsOpenStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowIsOpenStore(e.target.checked);
  };

  return (
    <div className="flexcol gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-black text-sm font-medium leading-[125%] select-none">
          <input
            className="checkbox"
            type="checkbox"
            id="openStore"
            checked={showIsOpenStore}
            onChange={handleIsOpenStore}
          />
          <label className="" htmlFor="openStore">
            주문가능 가게만 보기
          </label>
        </div>
        <div className="flex gap-2 text-[#888] text-[13px] font-semibold leading-[125%] select-none">
          {filterButton.map((button, index) => (
            <Fragment key={button.id}>
              {index !== 0 && <p className="cursor-default">|</p>}
              <button
                className={filter === button.id ? "text-orange" : ""}
                onClick={() => handleFilterStatus(button.id)}
              >
                {button.name}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <ul className="bg-[#fff3f0] w-full h-full flexcol px-5 py-8 gap-4 select-none">
        {filterData().map((data) => (
          <li className="bg-white rounded-lg" key={data.storeId}>
            <Link className="w-full flex items-start gap-5 px-5 py-6 drag-none" href={`stores/${data.storeId}`}>
              <Image src={data.storePictureUrl} alt="store" width={50} height={50} className="drag-none" />
              <div>
                <p className="text-base font-bold leading-[150%]">{data.name}</p>
                <div className="flex gap-[6px] mt-2 text-[#787878] text-xs font-normal leading-[150%]">
                  <p>{`영업시간 : ${data.openedTime.substring(0, 5)}~${data.closedTime.substring(0, 5)}`}</p>
                  <p>|</p>
                  <p>{data.closedDays}</p>
                </div>
                <p className="text-[#787878] text-xs font-normal leading-[150%]">{data.address}</p>
                {distanceGap !== undefined && (
                  <p className="text-[#787878] text-xs font-normal leading-[150%]">
                    가게까지 {Math.round(distanceGap[data.storeId] * 100) / 100}km
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
