import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const postShipmentAddress = async (shipmentAddress) => {
  const response = await axios.post(
    BASE_API_URL + "/user/address",
    shipmentAddress,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default postShipmentAddress;