import React from 'react';
import CurrencyFormat from 'react-currency-format';

const CurrencyFormatter = ({ value, renderText }) => {
  return (
    <CurrencyFormat
      value={value}
      displayType={'text'}
      prefix={'Rp'}
      thousandSeparator="."
      decimalSeparator=","
      renderText={renderText}
    />
  );
};

export default CurrencyFormatter;