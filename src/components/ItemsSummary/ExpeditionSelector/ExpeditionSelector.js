import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { CheckoutContext } from '../../../context/CheckoutContext/CheckoutContext';
import getExpeditions from '../../../helpers/api/get-expeditions';
import getShipmentCost from '../../../helpers/api/get-shipment-cost';
import { ASSIGN_EXPEDITION } from '../../../context/CheckoutContext/CheckoutActions';

const ExpeditionSelector = ({ assignedBrand }) => {
  const [expeditions, setExpeditions] = useState([]);
  const [value, setValue] = useState(null);
  const {
    shipment_address,
    dispatch,
  } = useContext(CheckoutContext);
  const expeditionsQuery = useQuery('get-expeditions', async () => {
    const response = await getExpeditions();

    return response.data;
  }, {
    enabled: !!shipment_address.address,
    onError: (err) => console.log(err)
  });
  const costQuery = useQuery(
    ['shipment-cost', { district_id: shipment_address.address?.districts.district_id }],
    async ({ queryKey }) => {
      const [, { district_id }] = queryKey;

      const responses = await Promise.all(
        expeditionsQuery.data.map(expedition => getShipmentCost(district_id, expedition.code))
      );

      return responses.map(response => response.data[0]);
    },
    {
      enabled: !!shipment_address.address && !!expeditionsQuery.data,
      onSuccess: (data) => {
        const exps = [];
        expeditionsQuery.data.forEach(exp => {
          const concattedExpCost = { name: exp.name, code: exp.code };
          const relatedCost = data.find(cost => cost.code === exp.code);

          relatedCost.costs.forEach(cost => {
            concattedExpCost.service = cost.service;
            concattedExpCost.description = cost.description;

            cost.cost.forEach(c => {
              concattedExpCost.cost = +c.value;
              concattedExpCost.estimated = c.etd;

              exps.push({ ...concattedExpCost, encoded: `${exp.code}-${cost.service}-${c.value}` });
            });
          });
        });

        setExpeditions(exps);
      },
      onError: (err) => console.log(err),
    }
  );

  const shipmentChangeHandler = (event) => {
    const expeditionCode = event.target.value;
    const decoded = expeditionCode.split('-');

    if (expeditionCode !== '') {
      const selectedExpedition = expeditions.find(exp => (
        exp.code === decoded[0]
        && exp.service === decoded[1]
        && exp.cost === +decoded[2]
      ));
      setValue({ ...selectedExpedition });
      dispatch({
        type: ASSIGN_EXPEDITION,
        payload: {
          brand_slug: assignedBrand,
          expedition: selectedExpedition,
        }
      });
    } else {
      setValue(null);
      dispatch({
        type: ASSIGN_EXPEDITION,
        payload: {
          brand_slug: assignedBrand,
          expedition: null,
        }
      });
    }
  };

  return (
    <>
      <Form.Select
        aria-label="Shipment service"
        onChange={shipmentChangeHandler}
        disabled={
          expeditions.length < 1
          || !!!shipment_address.address
          || costQuery.isLoading
        }
        value={value?.encoded}
      >
        <option value="">{costQuery.isLoading ? 'Mengambil data' : 'Pilihan pengiriman'}</option>
        {expeditions.map(exp =>
          <option key={exp.encoded} value={exp.encoded}>{exp.name} - {exp.service} (Rp{exp.cost},-)</option>)
        }
      </Form.Select>
      {!!value?.cost && <div className="shipment-detail border p-2">
        <p className="text-gray">{value.service} ({value.description})</p>
        <p className="mb-0 text-gray">Estimasi sampai {value.estimated} hari</p>
      </div>}
    </>
  );
};

export default ExpeditionSelector;