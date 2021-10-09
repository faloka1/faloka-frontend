import React from 'react';

import './ShipmentAddress.scss';

import { ReactComponent as LocationIcon } from '../SVG/location.svg';
import EditAddressModal from '../EditAddressModal/EditAddressModal';
import useToggle from '../../hooks/use-toggle';

const ShipmentAddress = ({ className }) => {
  const { toggle, setToggleOff, setToggleOn } = useToggle();

  return (
    <>
      <EditAddressModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <div className={`shipment-address d-flex p-3${className ? ' ' + className : ''}`}>
        <LocationIcon className="icon flex-shrink-0" />
        <div className="address-detail flex-grow-1">
          <p><strong>Data Pengiriman</strong></p>
          <p>Ela</p>
          <p><span className="text-gray">Alamat : </span> Jalan menuju hatimu, no.100 Jawa Timur, Surabaya, Gununganyar</p>
          <p><span className="text-gray">No. Telpon : </span> 089219201291</p>
          <div className="actions d-flex justify-content-end">
            <p onClick={setToggleOn}>Edit</p>
            <p className="ml-3">Hapus</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentAddress;