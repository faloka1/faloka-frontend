import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const postCheckoutData = async (checkoutData) => {
  const response = await axios.post(
    BASE_API_URL + "/checkout",
    checkoutData,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default postCheckoutData;