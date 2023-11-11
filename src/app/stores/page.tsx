"use client";

import { Fragment, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { mockData } from "./testDb";

type Filter = "all" | "new";

interface ButtonProps {
  name: string;
  id: Filter;
}

export default function Stores() {
  const [filter, setFilter] = useState<Filter>("all");
  const [showIsOpenStore, setShowIsOpenStore] = useState<boolean>(false);

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const handleIsOpenStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowIsOpenStore(e.target.checked);
  };

  const filterButton: ButtonProps[] = [
    { name: "전체", id: "all" },
    { name: "최신순", id: "new" },
  ];
  const date = new Date();
  const currentTime = `${date.getHours()}${date.getMinutes()}`;

  const filterData = mockData.filter((data) => {
    const openTime = data.openedTime.replace("T", "").replace(":", "");
    const closeTime = data.closedTime.replace("T", "").replace(":", "");
    if (showIsOpenStore) {
      return openTime < currentTime && closeTime > currentTime;
    } else return data;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-[#333] text-sm font-medium leading-[125%] select-none">
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
              <button className={filter === button.id ? "text-[#ff3d00]" : ""} onClick={() => handleFilter(button.id)}>
                {button.name}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <ul className="bg-[#fff3f0] w-full h-full flexcol px-5 py-8 gap-4">
        {filterData.map((data) => (
          <li className="bg-white rounded-lg" key={data.storeId}>
            <Link className="w-full flex items-start gap-5 px-5 py-6" href={`stores/${data.storeId}`}>
              <Image src={data.storePictureUrl} alt="store" width={50} height={50} />
              <div>
                <p className="text-base font-bold leading-[150%]">{data.name}</p>
                <div className="flex gap-[6px] mt-2 text-[#787878] text-xs font-normal leading-[150%]">
                  <p className="">{`영업시간 : ${data.openedTime.replace("T", "")}~${data.closedTime.replace(
                    "T",
                    "",
                  )}`}</p>
                  <p className="">|</p>
                  <p className="">{data.closedDays}</p>
                </div>
                <p className="text-[#787878] text-xs font-normal leading-[150%]">{data.address}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
