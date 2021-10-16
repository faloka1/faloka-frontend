import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getPaymentMethods = async () => {
  const response = await axios.get(BASE_API_URL + "/payment");

  return response;
};

export default getPaymentMethods;