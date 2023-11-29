import { Fragment } from "react";

import type { Filter } from "@/app/stores/page";

interface ButtonProps {
  name: string;
  id: Filter;
}

const filterButton: ButtonProps[] = [
  { name: "전체", id: "all" },
  { name: "최신순", id: "new" },
  { name: "거리순", id: "distance" },
];

interface Props {
  filter: Filter;
  showIsOpenStore: boolean;
  changeFilterStatus: (filter: Filter) => void;
  currentIsOpenStore: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StoreHeader({ filter, showIsOpenStore, changeFilterStatus, currentIsOpenStore }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center text-black text-sm font-medium leading-[125%] select-none">
        <input
          className="checkbox"
          type="checkbox"
          id="openStore"
          checked={showIsOpenStore}
          onChange={currentIsOpenStore}
        />
        <label className="" htmlFor="openStore">
          주문가능 가게만 보기
        </label>
      </div>
      <div className="flex gap-2 text-[#888] text-[13px] font-semibold leading-[125%] select-none">
        {filterButton.map((button, index) => (
          <Fragment key={button.id}>
            {index !== 0 && <p className="cursor-default">|</p>}
            <button className={filter === button.id ? "text-orange" : ""} onClick={() => changeFilterStatus(button.id)}>
              {button.name}
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
