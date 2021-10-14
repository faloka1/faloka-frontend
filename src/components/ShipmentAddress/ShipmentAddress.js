import React, { useContext } from 'react';

import './ShipmentAddress.scss';

import { ReactComponent as LocationIcon } from '../SVG/location.svg';
import EditAddressModal from '../EditAddressModal/EditAddressModal';
import useToggle from '../../hooks/use-toggle';
import { Spinner } from 'react-bootstrap';
import concatAddress from '../../helpers/concat-address';
import { useMutation } from 'react-query';
import deleteShipmentAddress from '../../helpers/api/delete-shipment-address';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';

const ShipmentAddress = ({ className, shipmentAddress, loading }) => {
  const { setShipmentAddress } = useContext(CheckoutContext);
  const { toggle, setToggleOff, setToggleOn } = useToggle();
  const { mutate, isLoading } = useMutation(async id => {
    return deleteShipmentAddress(id);
  }, {
    onSuccess: (data) => {
      setShipmentAddress(prev => ({
        name: prev.name,
        address: null,
        phoneNumber: prev.phoneNumber,
      }));
    }
  });
  const loadingState = isLoading || loading;

  const deleteHandler = () => {
    mutate(shipmentAddress.address.id);
  };

  return (
    <>
      <EditAddressModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <div className={`shipment-address d-flex p-3${className ? ' ' + className : ''}`}>
        {loadingState &&
          <Spinner className="mx-auto" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
        {!loadingState &&
          <>
            <LocationIcon className="icon flex-shrink-0" />
            <div className="address-detail flex-grow-1">
              <p><strong>Data Pengiriman</strong></p>
              <p>{shipmentAddress.name}</p>
              {!!shipmentAddress.address && <p>{concatAddress(shipmentAddress.address)}</p>}
              {!!!shipmentAddress.address && <p className="text-danger">Kamu belum memiliki alamat untuk pengiriman</p>}
              <p className="text-gray">{shipmentAddress.phoneNumber}</p>
              <div className="actions d-flex justify-content-end">
                <p onClick={setToggleOn}>{shipmentAddress.address === null ? 'Tambah Alamat' : 'Edit'}</p>
                {shipmentAddress.address !== null && <p className="ml-3" onClick={deleteHandler}>Hapus</p>}
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default ShipmentAddress;