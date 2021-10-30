import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0,
  },
  reducers: {
    addQuantity(state, action) {
      const { quantity } = action.payload;

      state.totalQuantity += quantity;
    },
    substractQuantity(state, action) {
      const { quantity } = action.payload;

      state.totalQuantity -= quantity;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;