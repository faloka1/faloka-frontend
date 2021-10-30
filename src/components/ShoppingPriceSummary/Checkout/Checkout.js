import React from 'react';

import useToggle from '../../../hooks/use-toggle';
import ShoppingSummaryModal from '../../ShoppingSummaryModal/ShoppingSummaryModal';
import ShoppingPriceSummary from '../ShoppingPriceSummaryV2';
import CheckoutActionButton from './CheckoutActionButton';

const Checkout = () => {
  const { toggle, setToggleOff, setToggleOn } = useToggle();

  return (
    <>
      <ShoppingSummaryModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <ShoppingPriceSummary button={<CheckoutActionButton onToggleModal={setToggleOn} />} />
    </>
  )
}

export default Checkout
