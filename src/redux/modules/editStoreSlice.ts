import { createSlice } from "@reduxjs/toolkit";

import type { IStore } from "@/types/store.type";

export interface editStoreState {
  modifyState: boolean;
  storeInfo: IStore;
}

const initialState: editStoreState | null | undefined = {
  modifyState: false,
  storeInfo: {
    storeId: 0,
    name: "",
    address: "",
    phone: "",
    content: "",
    productCreatedTime: "",
    openedTime: "",
    closedTime: "",
    closedDays: "",
    storePictureUrl: "",
    products: [],
    createdDate: "",
    modifiedDate: "",
  },
};

const ModifyStore = createSlice({
  name: "ModifyStore",
  initialState,
  reducers: {
    setStore: (state, action) => {
      if (!action.payload) return;
      state.storeInfo = { ...action.payload };
    },

    setModifyStore: (state, action) => {
      if (!action.payload) return;
      const { target, value } = action.payload;
      state.storeInfo = { ...state.storeInfo, [target]: value };
    },

    isModify: (state) => {
      state.modifyState = !state.modifyState;
    },
  },
});

export const { setStore, setModifyStore, isModify } = ModifyStore.actions;

export default ModifyStore.reducer;
