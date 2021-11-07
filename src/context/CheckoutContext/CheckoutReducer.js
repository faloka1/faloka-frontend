import groupCartItem from '../../helpers/group-cart-item';
import {
  INIT_CHECKOUT,
  ADD_SHIPMENT_ADDRESS,
  ADD_PAYMENT_METHOD,
  DELETE_SHIPMENT_ADDRESS,
  ASSIGN_EXPEDITION,
  SET_CURRENT_PAGE,
  CONFIRM_CHECKOUT,
  ASSIGN_SUMMARY_ENTRIES,
  SET_BUTTON,
} from './CheckoutActions';

const CheckoutReducer = (state, action) => {
  switch (action.type) {
    case INIT_CHECKOUT:
      const { name, phone_number, items, address } = action.payload;
      const totalQuantity = items.reduce((accumulator, item) => (accumulator + item.quantity), 0);
      const totalPrice = items.reduce((accumulator, item) => (accumulator + (item.price * item.quantity)), 0);
      const shipmentAddress = {
        name,
        phone_number,
        address
      };
      const grouped = groupCartItem(items);

      grouped.forEach(g => {
        g.expedition = null;
      });

      return {
        ...state,
        items: grouped,
        shipment_address: shipmentAddress,
        total_quantity: totalQuantity,
        total_items_price: totalPrice,
      };
    case ADD_SHIPMENT_ADDRESS:
      const { shipment_address } = action.payload;

      return {
        ...state,
        items: state.items.map(item => ({ ...item, expedition: null })),
        shipment_address: { ...state.shipment_address, address: shipment_address },
      };
    case ADD_PAYMENT_METHOD:
      const { payment_method } = action.payload;

      return {
        ...state,
        payment_method,
      };
    case DELETE_SHIPMENT_ADDRESS:
      return {
        ...state,
        shipment_address: { ...state.shipment_address, address: null },
        items: state.items.map(item => ({ ...item, expedition: null })),
      };
    case ASSIGN_EXPEDITION:
      const { brand_slug, expedition } = action.payload;
      const updatedItems = state.items.map(item => {
        if (item.slug === brand_slug) {
          item.expedition = expedition;
        }

        return item;
      });

      const totalExpeditionCost = updatedItems.reduce((accumulator, item) => {
        if (!!!item.expedition) {
          return accumulator + 0;
        }

        return accumulator + item.expedition.cost;
      }, 0);

      return {
        ...state,
        total_expedition_cost: totalExpeditionCost,
        items: updatedItems
      };
    case SET_CURRENT_PAGE:
      const { current_page } = action.payload;

      return {
        ...state,
        current_page,
      };
    case CONFIRM_CHECKOUT:
      const { order_id } = action.payload;

      return {
        ...state,
        order_id,
        is_confirmed: true
      };
    case ASSIGN_SUMMARY_ENTRIES:
      const { summary_entries } = action.payload;

      return {
        ...state,
        summary_entries
      };
    case SET_BUTTON:
      const { button } = action.payload;

      return {
        ...state,
        button,
      };
    default:
      throw new Error();
  }
};

export default CheckoutReducer;