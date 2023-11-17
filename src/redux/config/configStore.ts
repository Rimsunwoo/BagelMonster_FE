import { configureStore } from "@reduxjs/toolkit";

import editStore from "../modules/editStoreSlice";
import productCount from "../modules/productCountSlice";
const store = configureStore({
  reducer: { productCount, editStore },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
