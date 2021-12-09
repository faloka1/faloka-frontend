import React, { useContext, useEffect } from 'react';
import { SET_CURRENT_PAGE, ASSIGN_SUMMARY_ENTRIES, SET_BUTTON } from '../../../context/CheckoutContext/CheckoutActions';

import ShipmentAddress from '../../../components/ShipmentAddress/ShipmentAddress';
import { CheckoutContext, SHIPMENT_PAGE, PAYMENT_PAGE } from '../../../context/CheckoutContext/CheckoutContext';
import ItemsSummary from '../../../components/ItemsSummary/ItemsSummary';
import { Link } from 'react-router-dom';

const Shipment = () => {
  const {
    shipment_address,
    items,
    total_quantity,
    total_items_price,
    total_expedition_cost,
    dispatch
  } = useContext(CheckoutContext);

  useEffect(() => {
    const NextButton = () => {
      const disabled = items.some(item => !!!item.expedition) || !!!shipment_address.address;

      return (
        <Link
          to="/checkout/payment"
          className={`btn-black pay-btn w-100 d-inline-block w-100 text-center py-2 mt-2 ${disabled ? 'disabled' : ''}`}
          disabled={disabled}
          onClick={() => { dispatch({ type: SET_CURRENT_PAGE, payload: { current_page: PAYMENT_PAGE } }) }}
        >Lanjut Bayar</Link>
      );
    };

    dispatch({
      type: SET_CURRENT_PAGE,
      payload: {
        current_page: SHIPMENT_PAGE
      }
    });
    dispatch({
      type: SET_BUTTON,
      payload: {
        button: <NextButton />
      }
    });
    dispatch({
      type: ASSIGN_SUMMARY_ENTRIES,
      payload: {
        summary_entries: [
          {
            label: `Total Harga (${total_quantity} barang)`,
            price: total_items_price
          },
          {
            label: 'Biaya Ongkir',
            price: total_expedition_cost
          }
        ]
      }
    });
  }, [dispatch, total_quantity, total_items_price, items, shipment_address?.address, total_expedition_cost]);

  return (
    <>
      <ShipmentAddress shipmentAddress={shipment_address} className="mb-4" />
      {items.map(item => (
        <ItemsSummary key={item.slug} brand={{ name: item.name, slug: item.slug }} items={item.items} className="mb-4" />
      ))}
    </>
  );
};

export default Shipment;