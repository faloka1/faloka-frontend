import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const putShipmentAddress = async (shipmentAddress, addressId) => {
  const response = await axios.put(
    `${BASE_API_URL}/user/address/${addressId}`,
    shipmentAddress,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default putShipmentAddress;