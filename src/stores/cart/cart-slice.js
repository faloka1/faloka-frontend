import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0,
    items: [],
    isLoading: false
  },
  reducers: {
    addItem(state, action) {
      const { item, quantity } = action.payload;

      state.items.push({
        id: item.id,
        brand: {
          id: item.brand.id,
          slug: item.brand.slug,
          name: item.brand.name,
        },
        product_id: item.product_id,
        variant_id: item.variant_id,
        name: item.name,
        image: item.image,
        size: item.size,
        price: item.price,
        quantity: +quantity,
        checked: true
      });

      state.totalQuantity += +quantity;
    },
    updateQuantity(state, action) {
      const { product_id, variant_id, quantity } = action.payload;

      const foundItem = state.items.find(p => (p.product_id === product_id && p.variant_id === variant_id));
      state.totalQuantity -= foundItem.quantity;
      foundItem.quantity = +quantity;
      state.totalQuantity += +quantity;
    },
    deleteItem(state, action) {
      const { cart_id } = action.payload;

      const foundItem = state.items.find(item => item.id === cart_id);
      state.totalQuantity -= foundItem.quantity;
      state.items = state.items.filter(item => item.id !== cart_id);
    },
    updateCheck(state, action) {
      const { product_id, variant_id, checked } = action.payload;

      const foundItem = state.items.find(p => (p.product_id === product_id && p.variant_id === variant_id));
      foundItem.checked = checked;
    },
    updateIsLoading(state, action) {
      const { isLoading } = action.payload;

      state.isLoading = isLoading;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;