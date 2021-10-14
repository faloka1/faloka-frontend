import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { Modal, Form as BootstrapForm } from 'react-bootstrap';
import {
  Formik,
  Form as FormikForm,
  Field,
  useFormikContext,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import getProvinces from '../../helpers/api/location/get-provinces';
import getDistricts from '../../helpers/api/location/get-districts';
import postShipmentAddress from '../../helpers/api/post-shipment-address';
import putShipmentAddress from '../../helpers/api/put-shipment-address';

const TextFieldInput = ({ name, disabled, ...props }) => {
  const { values } = useFormikContext();
  return (
    <Field name={name} {...props}>
      {({ form: { setFieldValue } }) => (
        <BootstrapForm.Control
          value={values[name]}
          onChange={e => { setFieldValue(name, e.target.value) }}
          disabled={disabled}
        />
      )}
    </Field>
  );
};

const SelectFieldInput = ({ options, name, disabled, ...props }) => {
  const {
    values,
  } = useFormikContext();

  return (
    <Field name={name} as="select" {...props}>
      {({ form: { setFieldValue } }) => {
        return (
          <BootstrapForm.Select
            value={values[name]}
            onChange={e => { setFieldValue(name, e.target.value) }}
            disabled={options.length < 1 || disabled}
          >
            <option value=''>...</option>
            {options.map(option => (
              <option key={option.key} value={option.key}>{option.value}</option>
            ))}
          </BootstrapForm.Select>
        )
      }}
    </Field>
  )
};

const DistrictSelectField = (props) => {
  const [districts, setDistricts] = useState([]);
  const {
    values: { address_province },
  } = useFormikContext();

  const { isLoading } = useQuery(
    ['get-district', { address_province }],
    async ({ queryKey }) => {
      const [, { address_province }] = queryKey;
      const response = await getDistricts(address_province);

      return response.data;
    },
    {
      onSuccess: (data) => {
        setDistricts(data.map(district => ({
          key: district.city_id,
          value: district.city_name
        })));
      },
      enabled: !!address_province
    });

  return (
    <SelectFieldInput disabled={isLoading} options={districts} {...props} />
  );
};

const ShipmentAddressSchema = Yup.object({
  address_province: Yup.number().required(),
  address_district: Yup.number().required(),
  address_sub_district: Yup.string().required(),
  address_location: Yup.string().required(),
  address_postal_code: Yup.number().required()
});

const EditAddressModal = ({ closeFunc, ...props }) => {
  const { shipmentAddress, setShipmentAddress } = useContext(CheckoutContext);
  const [provinces, setProvinces] = useState([]);
  useQuery('get-provinces', async () => {
    const response = await getProvinces();

    return response.data;
  }, {
    onError: (err) => console.log(err),
    onSuccess: (data) => setProvinces(data.map(province => ({
      key: province.province_id,
      value: province.province
    }))),
  });
  const { mutate, isLoading: postLoading } = useMutation(async values => {
    const postShipmentAddressData = {
      province_id: values.address_province,
      district_id: values.address_district,
      sub_district: values.address_sub_district,
      postal_code: values.address_postal_code,
      location: values.address_location,
    };

    if (shipmentAddress.address === null) {
      const response = await postShipmentAddress(postShipmentAddressData);

      return response.data;
    } else {
      const response = await putShipmentAddress(postShipmentAddressData, shipmentAddress.address.id);

      return response.data;
    }
  }, {
    onSuccess: (mutateData) => {
      setShipmentAddress(prev => ({
        name: prev.name,
        address: mutateData.addresses,
        phoneNumber: prev.phoneNumber
      }));

      closeFunc();
    }
  });

  const formSubmitHandler = (values) => {
    mutate(values);
  };

  return (
    <Modal {...props}>
      <Modal.Body>
        <p className="h3 text-center mb-4">
          {
            shipmentAddress.address === null
              ? 'Tambah Alamat'
              : 'Ubah Alamat'
          }
        </p>
        <Formik
          initialValues={{
            full_name: shipmentAddress.name,
            phone_number: shipmentAddress.phoneNumber,
            address_province: !!shipmentAddress.address ? shipmentAddress.address.provinces.province_id : '',
            address_district: !!shipmentAddress.address ? shipmentAddress.address.districts.district_id : '',
            address_sub_district: !!shipmentAddress.address ? shipmentAddress.address.sub_district : '',
            address_location: !!shipmentAddress.address ? shipmentAddress.address.location : '',
            address_postal_code: !!shipmentAddress.address ? shipmentAddress.address.postal_code : ''
          }}
          onSubmit={formSubmitHandler}
          validationSchema={ShipmentAddressSchema}
        >
          {({ errors }) => {
            const anyFieldError = Object.values(errors).map(er => !!er).some(er => er);

            return (
              <FormikForm>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="full_name" className="text-gray">Nama Lengkap Penerima</label>
                  <TextFieldInput className="p-2" id="full_name" name="full_name" type="text" disabled />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="phone_number" className="text-gray">No.HP Penerima</label>
                  <TextFieldInput className="p-2" id="phone_number" name="phone_number" type="text" disabled />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="address_province" className="text-gray">Provinsi</label>
                  <SelectFieldInput options={provinces} className="p-2" id="address_province" name="address_province" />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="address_district" className="text-gray">Kabupaten / Kota</label>
                  <DistrictSelectField className="p-2" id="address_district" name="address_district" />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="address_sub_district" className="text-gray">Kecamatan</label>
                  <TextFieldInput className="p-2" id="address_sub_district" name="address_sub_district" type="text" />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="address_postal_code" className="text-gray">Kode Pos</label>
                  <TextFieldInput className="p-2" id="address_postal_code" name="address_postal_code" type="text" />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="address_location" className="text-gray">Detail Alamat</label>
                  <TextFieldInput className="p-2" id="address_location" name="address_location" type="text" />
                </div>
                {anyFieldError && <p className="text-danger text-center">Pastikan Semua Field Benar!</p>}
                <Field className={`btn-black w-100 py-2 ${postLoading || anyFieldError ? 'disabled' : ''}`} type="submit" value="Simpan" disabled={postLoading || anyFieldError} />
              </FormikForm>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditAddressModal
