import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";

import { setEditStore } from "@/redux/modules/editStoreSlice";

import StatusIcon from "../productDetail/StatusIcon";

import type { RootState } from "@/redux/config/configStore";

interface StoreIntro {
  isOpen: boolean | undefined;
}

export default function StoreIntro({ isOpen }: StoreIntro) {
  const { editState, storeInfo } = useSelector((state: RootState) => state.editStore);
  const dispatch = useDispatch();

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setEditStore({ target: name, value }));
  };

  return (
    <section className="mb-10">
      <div className="w-full h-[560px] overflow-hidden relative">
        <Image src={storeInfo.storePictureUrl} alt="storeImage" fill />
      </div>
      {isOpen && <span className="text-sm font-semibold text-orange inline-block mb-[14px]">지금 영업중</span>}
      <div className="flex items-center gap-2 mb-[14px] text-xl font-bold">
        {editState ? (
          <input
            className="border rounded-md px-2"
            type="text"
            name="name"
            defaultValue={storeInfo.name}
            value={storeInfo.name}
            onChange={onChangeInfo}
          />
        ) : (
          <h2>{storeInfo.name}</h2>
        )}
        <StatusIcon status="NEW" />
      </div>
      {editState ? (
        <textarea
          className="border w-full h-[100px] resize-none rounded-md px-3 text-gray text-[11px]"
          name="content"
          defaultValue={storeInfo.content}
          value={storeInfo.content}
          onChange={onChangeInfo}
        />
      ) : (
        <h2 className="text-gray text-[11px]">{storeInfo.content}</h2>
      )}
    </section>
  );
}
