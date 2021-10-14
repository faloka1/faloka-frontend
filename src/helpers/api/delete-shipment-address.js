import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const deleteShipmentAddress = async (addressId) => {
  const response = await axios.delete(
    `${BASE_API_URL}/user/address/${addressId}`,
    {},
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default deleteShipmentAddress;