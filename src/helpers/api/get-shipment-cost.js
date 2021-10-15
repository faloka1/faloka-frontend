import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getShipmentCost = async (
  toDistrictId,
  courierCode) => {
  const response = await axios.get(`${BASE_API_URL}/ongkir?origin=${501}&destination=${toDistrictId}&weight=1000&courier=${courierCode}`);

  return response;
};

export default getShipmentCost;