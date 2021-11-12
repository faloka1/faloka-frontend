import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { useMutation } from 'react-query';

import './ShipmentAddress.scss';

import { ReactComponent as LocationIcon } from '../SVG/location.svg';
import EditAddressModal from '../EditAddressModal/EditAddressModal';
import useToggle from '../../hooks/use-toggle';
import concatAddress from '../../helpers/concat-address';
import deleteShipmentAddress from '../../helpers/api/delete-shipment-address';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import AddressDeleteDialog from '../AddressDeleteDialog/AddressDeleteDialog';
import { DELETE_SHIPMENT_ADDRESS } from '../../context/CheckoutContext/CheckoutActions';

const ShipmentAddress = ({ className, shipmentAddress, loading }) => {
  const { dispatch } = useContext(CheckoutContext);
  const { toggle, setToggleOff, setToggleOn } = useToggle();
  const { toggle: addressDeleteToggle, setToggleOn: addressDeleteOn, setToggleOff: addressDeleteOff } = useToggle();
  const { mutate, isLoading } = useMutation(async id => {
    return deleteShipmentAddress(id);
  }, {
    onError: (error) => console.log(error)
  });
  const loadingState = isLoading || loading;

  const deleteHandler = () => {
    mutate(shipmentAddress.address.id);
    dispatch({ type: DELETE_SHIPMENT_ADDRESS });
  };

  if (shipmentAddress === null) {
    return null;
  }

  return (
    <>
      <AddressDeleteDialog show={addressDeleteToggle} onHide={addressDeleteOff} closeFunc={addressDeleteOff} deleteHandler={deleteHandler} centered />
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
              <p className="text-gray">{shipmentAddress.phone_number}</p>
              <div className="actions d-flex justify-content-end">
                <p onClick={setToggleOn}>{shipmentAddress.address === null ? 'Tambah Alamat' : 'Edit'}</p>
                {shipmentAddress.address !== null && <p className="ml-3" onClick={addressDeleteOn}>Hapus</p>}
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default ShipmentAddress;