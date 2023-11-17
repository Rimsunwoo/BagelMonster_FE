import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modifyStore } from "@/app/api/store";
import useAuth from "@/hooks/useAuth";
import { isEdit, setEditStore } from "@/redux/modules/editStoreSlice";

import { days } from "../mypage/input.category";

import type { RootState } from "@/redux/config/configStore";

// @TODO useForm
// @TODO 유효성 검사
export default function ModifyStoreForm() {
  const { isStore, getCookie, getUserInfo } = useAuth();
  const { editState, storeInfo } = useSelector((state: RootState) => state.editStore);
  const { openedTime, closedTime, closedDays, name, phone, address } = storeInfo;

  const [week, setWeek] = useState<string[]>(closedDays.split(", "));
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const dispatch = useDispatch();

  const userInfo = getUserInfo();
  const onChagneWeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (value === "연중무휴") {
      setWeek(["연중무휴"]);
      return;
    }

    if (value !== "연중무휴" && week.includes("연중무휴")) {
      setWeek((prev) => prev.filter((item) => item !== "연중무휴"));
      return;
    }

    if (checked) {
      setWeek((prev) => [...prev, value]);
    } else {
      setWeek((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    dispatch(setEditStore({ target: "closedDays", value: week.join(", ") }));
  }, [dispatch, week]);

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setEditStore({ target: name, value }));
  };

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgFile(e.target.files![0]);
  };
  const queryClient = useQueryClient();

  const modifyStoreMutate = useMutation({
    mutationFn: modifyStore,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mystore", userInfo?.name] }),
  });

  const modifyStoreHandler = () => {
    const request = {
      name,
      address,
      phone,
      openedTime,
      closedTime,
      closedDays,
      content: storeInfo.content,
      productCreatedTime: storeInfo.productCreatedTime,
      storeId: storeInfo.storeId,
    };

    modifyStoreMutate.mutate({ store: request, token: getCookie(), file: imgFile });
    dispatch(isEdit());
  };

  return (
    <section className="mb-9">
      <input type="file" accept="image/*" onChange={(e) => onChangeImg(e)} />

      {editState && isStore() && (
        <input
          type="button"
          className="auth-button flex items-center justify-center w-full text-white my-2"
          value="수정완료"
          onClick={modifyStoreHandler}
        />
      )}
      <div className="pb-8 space-y-2">
        <p className="text-[13px]">
          <span className="info-box">영업시간</span>
          <input
            className="border rounded-md px-2"
            type="time"
            name="openedTime"
            defaultValue={openedTime}
            value={openedTime}
            onChange={onChangeInfo}
          />
          <span>~</span>
          <input
            className="border rounded-md px-2"
            type="time"
            name="closedTime"
            defaultValue={closedTime}
            value={closedTime}
            onChange={onChangeInfo}
          />
        </p>
        <p className="text-[13px] flex justify-between">
          <span className="info-box">휴무일</span>
          {days.map((day) => (
            <label key={day.id} htmlFor={day.id} className="flex gap-1">
              <input
                className="checkbox"
                type="checkbox"
                id={day.id}
                checked={week.includes(day.value)}
                value={day.value}
                name={day.value}
                onChange={(e) => onChagneWeek(e)}
              />
              {day.value}
            </label>
          ))}
          <label htmlFor="noneHoliday" className="flex gap-1">
            <input
              className="checkbox"
              type="checkbox"
              id="noneHoliday"
              checked={week.includes("연중무휴")}
              value="연중무휴"
              name="noneHoliday"
              onChange={(e) => onChagneWeek(e)}
            />
            연중무휴
          </label>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[13px]">
          <span className="info-box">상호명</span>
          <span>{name}</span>
        </p>
        <p className="text-[13px]">
          <span className="info-box">전화번호</span>
          <input
            className="border rounded-md px-2"
            type="phone"
            name="phone"
            defaultValue={phone}
            value={phone}
            onChange={onChangeInfo}
          />
        </p>
        <p className="text-[13px] flex gap-2">
          <span className="info-box">주소</span>
          <input
            className="border rounded-md px-2 w-full"
            type="address"
            name="address"
            defaultValue={address}
            value={address}
            onChange={onChangeInfo}
          />
        </p>
      </div>
    </section>
  );
}
