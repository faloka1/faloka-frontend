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
        slug: item.slug,
        name: item.name,
        image: item.image,
        variant_size: {
          id: item.variant_size.id,
          name: item.variant_size.name,
        },
        price: item.price,
        quantity: +quantity,
        checked: true
      });

      state.totalQuantity += +quantity;
    },
    updateQuantity(state, action) {
      const { product_id, variant_id, variant_size_id, quantity } = action.payload;

      const foundItem = state.items.find(p => (p.product_id === product_id && p.variant_id === variant_id && p.variant_size.id === variant_size_id));
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
      const { product_id, variant_id, variant_size_id, checked } = action.payload;

      const foundItem = state.items.find(p => (p.product_id === product_id && p.variant_id === variant_id && p.variant_size.id === variant_size_id));
      foundItem.checked = checked;
    },
    updateIsLoading(state, action) {
      const { isLoading } = action.payload;

      state.isLoading = isLoading;
    },
    resetCart(state) {
      state.totalQuantity = 0;
      state.items = [];
      state.isLoading = false;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;