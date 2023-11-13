import { createSlice } from "@reduxjs/toolkit";

export interface ProductCountState {
  [productId: string]: number;
}

const initialState: ProductCountState = {};

const productCountSlice = createSlice({
  name: "productCount",
  initialState,
  reducers: {
    setProductCount: (state, action) => {
      const { productId, count } = action.payload;
      state[productId] = count;
    },

    productCountPlus: (state, action) => {
      const productId = action.payload;
      if (state[productId]) {
        state[productId] += 1;
      } else {
        state[productId] = 1;
      }
    },

    productCountMinus: (state, action) => {
      const productId = action.payload;
      if (state[productId] && state[productId] !== 1) {
        state[productId] -= 1;
      }
    },
  },
});

export const { setProductCount, productCountPlus, productCountMinus } = productCountSlice.actions;

export default productCountSlice.reducer;
