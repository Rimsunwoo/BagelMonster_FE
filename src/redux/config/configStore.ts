import { configureStore } from "@reduxjs/toolkit";

import ModifyStore from "../modules/editStoreSlice";
import productCount from "../modules/productCountSlice";
const store = configureStore({
  reducer: { productCount, ModifyStore },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
