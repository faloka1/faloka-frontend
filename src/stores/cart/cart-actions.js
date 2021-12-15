import addToCart from '../../helpers/api/cart/add-to-cart';
import getCartItems from '../../helpers/api/cart/get-cart-items';
import patchCartQuantity from '../../helpers/api/cart/patch-cart-quantity';
import { cartActions } from './cart-slice';
import { BASE_CONTENT_URL } from '../../config/api';
import deleteCartItem from '../../helpers/api/cart/delete-cart-item';

export const fetchItems = () => {
  return async (dispatch) => {
    dispatch(cartActions.resetCart());
    try {
      const response = await getCartItems();
      const items = response.data;

      console.log(items);

      items.forEach(item => {
        dispatch(cartActions.addItem({
          item: {
            id: item.id,
            brand: {
              id: item.products.brand_id,
              slug: item.products.brands.slug,
              name: item.products.brands.name,
            },
            product_id: item.product_id,
            variant_id: item.variant_id,
            variant_size: {
              id: item.variantsize_id,
              name: item.variants.variants_sizes[0].name,
            },
            name: item.products.name,
            slug: item.products.slug,
            image: BASE_CONTENT_URL + item.variants.variants_image[0].image_url,
            price: item.products.price,
          },
          quantity: item.quantity
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItem = (item, quantity) => {
  return async (dispatch, getState) => {
    const { items } = getState().cart;
    const foundItem = items.find(p => (p.product_id === item.product_id && p.variant_id === item.variant_id && p.variant_size.id === item.variant_size.id));

    dispatch(cartActions.updateIsLoading({ isLoading: true }));

    if (foundItem) {
      const newQuantity = foundItem.quantity + quantity;

      try {
        await patchCartQuantity(foundItem.id, newQuantity);

        dispatch(cartActions.updateQuantity({
          product_id: foundItem.product_id,
          variant_id: foundItem.variant_id,
          variant_size_id: foundItem.variant_size.id,
          quantity: newQuantity
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await addToCart({
          quantity,
          product_id: item.product_id,
          variant_id: item.variant_id,
          variantsize_id: item.variant_size.id
        });
        item.id = response.data.cart_id;

        console.log(item)

        dispatch(cartActions.addItem({ item, quantity }));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(cartActions.updateIsLoading({ isLoading: false }));
  }
};

export const deleteItem = (cart_id) => {
  return (dispatch) => {
    dispatch(cartActions.updateIsLoading({ isLoading: true }));

    try {
      deleteCartItem(cart_id);
    } catch (err) {
      console.log(err);
    }

    dispatch(cartActions.deleteItem({ cart_id }));

    dispatch(cartActions.updateIsLoading({ isLoading: false }));
  };
};

export const updateQuantity = (cart_id, newQuantity) => {
  return (dispatch, getState) => {
    const { items } = getState().cart;
    const foundItem = items.find(item => item.id === cart_id);

    patchCartQuantity(foundItem.id, newQuantity);

    dispatch(cartActions.updateQuantity({
      product_id: foundItem.product_id,
      variant_id: foundItem.variant_id,
      variant_size_id: foundItem.variant_size.id,
      quantity: newQuantity
    }));
  }
};

export const completeCheckout = (cartIds) => {
  return (dispatch) => {
    dispatch(cartActions.updateIsLoading({ isLoading: true }));

    try {
      Promise.all(cartIds.map(cart_id => deleteCartItem(cart_id)));
    } catch (err) {
      console.log(err);
    }

    cartIds.forEach(cart_id => dispatch(cartActions.deleteItem({ cart_id })));

    dispatch(cartActions.updateIsLoading({ isLoading: false }));
  }
}