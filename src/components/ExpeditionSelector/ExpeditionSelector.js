import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from 'react-query';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import getExpeditions from '../../helpers/api/get-expeditions';
import getShipmentCost from '../../helpers/api/get-shipment-cost';

const ExpeditionSelector = () => {
  const [expeditions, setExpeditions] = useState([]);
  const [costs, setCosts] = useState([]);
  const {
    shipmentAddress,
    setExpedition: setExpeditionInContext,
    expedition: expeditionInContext
  } = useContext(CheckoutContext);
  const expeditionsQuery = useQuery('get-expeditions', async () => {
    const response = await getExpeditions();

    return response.data;
  }, {
    enabled: !!shipmentAddress.address,
    onError: (err) => console.log(err)
  });
  const costQuery = useQuery(
    ['shipment-cost', { district_id: shipmentAddress.address?.districts.district_id }],
    async ({ queryKey }) => {
      const [, { district_id }] = queryKey;

      const responses = await Promise.all(
        expeditionsQuery.data.map(expedition => getShipmentCost(district_id, expedition.code))
      );

      return responses.map(response => response.data[0]);
    },
    {
      enabled: !!shipmentAddress.address && !!expeditionsQuery.data,
      onSuccess: (data) => {
        let exps = expeditionsQuery.data;
        exps = exps.map((exps, i) => {
          if (data[i].costs.length > 0) {
            return {
              ...exps,
              cost: data[i].costs[0]?.cost[0].value
            };
          }
        }).filter(exp => !!exp);

        setExpeditions(exps);
        setCosts(data.filter(cost => cost.costs.length > 0).map(cost => ({
          code: cost.code,
          costs: cost.costs[0]
        })));
      },
      onError: (err) => console.log(err),
    }
  );

  const shipmentChangeHandler = (event) => {
    const expeditionCode = event.target.value;
    if (expeditionCode !== '') {
      const selectedData = costs.find(cost => cost.code === expeditionCode);
      setExpeditionInContext({
        name: expeditions.find(exp => exp.code === expeditionCode).name,
        code: selectedData.code,
        cost: selectedData.costs,
      });
    } else {
      setExpeditionInContext({
        name: '',
        code: '',
        cost: null,
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
          || costs.length < 1
          || !!!shipmentAddress.address
          || costQuery.isLoading
        }
        value={expeditionInContext.code}
      >
        <option value="">{costQuery.isLoading ? 'Mengambil data' : 'Pilihan pengiriman'}</option>
        {expeditions.map(exp =>
          <option key={exp.code} value={exp.code}>{exp.name} (Rp{exp.cost},-)</option>)
        }
      </Form.Select>
      {!!expeditionInContext.cost && <div className="shipment-detail border p-2">
        <p className="text-gray">{expeditionInContext.cost.service} ({expeditionInContext.cost.description})</p>
        <p className="mb-0 text-gray">Estimasi sampai {expeditionInContext.cost.cost[0].etd} hari</p>
      </div>}
    </>
  );
};

export default ExpeditionSelector;