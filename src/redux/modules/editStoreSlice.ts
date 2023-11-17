import { createSlice } from "@reduxjs/toolkit";

import type { IStore } from "@/types/store.type";

export interface editStoreState {
  editState: boolean;
  storeInfo: IStore;
}

const initialState: editStoreState | null | undefined = {
  editState: false,
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

const editStore = createSlice({
  name: "editStore",
  initialState,
  reducers: {
    setStore: (state, action) => {
      if (!action.payload) return;
      state.storeInfo = { ...action.payload };
    },

    setEditStore: (state, action) => {
      if (!action.payload) return;
      const { target, value } = action.payload;
      state.storeInfo = { ...state.storeInfo, [target]: value };
    },

    isEdit: (state) => {
      state.editState = !state.editState;
    },
  },
});

export const { setStore, setEditStore, isEdit } = editStore.actions;

export default editStore.reducer;
