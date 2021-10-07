import React, { useState } from 'react';

import './ShipmentAddress.scss';

import { ReactComponent as LocationIcon } from '../SVG/location.svg';
import EditAddressModal from '../EditAddressModal/EditAddressModal';

const ShipmentAddress = ({ className }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <EditAddressModal show={showModal} onHide={closeModalHandler} setShow={setShowModal} centered />
      <div className={`shipment-address d-flex p-3${className ? ' ' + className : ''}`}>
        <LocationIcon className="icon flex-shrink-0" />
        <div className="address-detail flex-grow-1">
          <p><strong>Data Pengiriman</strong></p>
          <p>Ela</p>
          <p><span className="text-gray">Alamat : </span> Jalan menuju hatimu, no.100 Jawa Timur, Surabaya, Gununganyar</p>
          <p><span className="text-gray">No. Telpon : </span> 089219201291</p>
          <div className="actions d-flex justify-content-end">
            <p onClick={showModalHandler}>Edit</p>
            <p className="ml-3">Hapus</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentAddress;