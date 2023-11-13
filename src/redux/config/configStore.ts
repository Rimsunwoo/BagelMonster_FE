import { configureStore } from "@reduxjs/toolkit";

import productCount from "../modules/productCountSlice";

const store = configureStore({
  reducer: { productCount },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
